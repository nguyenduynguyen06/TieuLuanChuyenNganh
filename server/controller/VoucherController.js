const Voucher = require('../Model/VourcherModel');
const moment = require('moment');
const { format } = require('date-fns');
const { parse, isAfter, isBefore } = require('date-fns');
const vi = require('date-fns/locale/vi');
const Cart = require('../Model/CartModel');
const addVoucher = async (req, res) => {
  try {
    const { name, code, quantity, discount, maxPrice, applicablePaymentMethod, applicableProductTypes } = req.body;
    const maKM = await Voucher.findOne({ code: code })
    if (maKM) {
      return res.status(200).json({ success: false, message: 'Code đã tồn tại' })
    }
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const formatstartDate = format(new Date(startDate), 'dd/MM/yyyy');
    const formatendDate = format(new Date(endDate), 'dd/MM/yyyy');
    const startDateParts = formatstartDate.split('/');
    const startDate1 = parse(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`, 'yyyy-MM-dd', new Date(), { locale: vi });
    const endDateParts = formatendDate.split('/');
    const endDate1 = parse(`${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`, 'yyyy-MM-dd', new Date(), { locale: vi });
    if (!isAfter(endDate1, startDate1)) {
      res.status(200).json({ success: false, message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu.' });
    } else {
      const discountPercentage = parseFloat(discount) / 100;
      const voucher = new Voucher({
        name,
        code,
        startDate: formatstartDate,
        endDate: formatendDate,
        quantity,
        discount: discountPercentage,
        maxPrice,
        applicablePaymentMethod,
        applicableProductTypes
      });

      const newVoucher = await voucher.save();
      res.status(201).json({ success: true, data: newVoucher });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const useVoucher = async (req, res) => {
  try {
    const { code } = req.body;
    const { userId } = req.query
    const voucher = await Voucher.findOne({ code });

    if (!voucher) {
      return res.status(400).json({ success: false, error: 'Mã voucher không tồn tại.' });
    }

    const currentDate = new Date();

    const startDateParts = voucher.startDate.split('/');
    const startDate1 = parse(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`, 'yyyy-MM-dd', new Date());
    const endDateParts = voucher.endDate.split('/');
    const endDate1 = parse(`${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`, 'yyyy-MM-dd', new Date());
    if (isBefore(currentDate, startDate1)) {
      return res.status(200).json({ success: false, error: 'Voucher chưa có hiệu lực.' });
    }

    if (isAfter(currentDate, endDate1)) {
      return res.status(200).json({ success: false, error: 'Voucher không còn hiệu lực.' });
    }

    if (voucher.quantity <= 0) {
      return res.status(200).json({ success: false, error: 'Số lượng voucher đã hết.' });
    }
    const applicablePaymentMethod = voucher.applicablePaymentMethod;
    const reqPaymentMethod = req.body.paymentMethod;
    if (applicablePaymentMethod && applicablePaymentMethod !== "Tất cả" && reqPaymentMethod !== applicablePaymentMethod) {
      return res.status(200).json({ success: false, error: `Voucher chỉ áp dụng cho phương thức ${applicablePaymentMethod}` });
    }
    const applicableProductTypes = voucher.applicableProductTypes;
    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: 'items.product',
        populate: {
          path: 'category',
          select: 'name'
        }
      });

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ success: false, error: 'Giỏ hàng không tồn tại hoặc trống' });
    }
    const cartProductCategories = cart.items.map(item => item.product.category.name);
    const isValidCart = cartProductCategories.every(category => applicableProductTypes.includes(category));
    if (!isValidCart) {
      return res.status(200).json({ success: false, error: `Voucher chỉ áp dụng cho đơn hàng có sản phẩm thuộc các loại sau: ${applicableProductTypes.join(', ')}` });
    }
    res.status(200).json({ success: true, message: 'Mã voucher hợp lệ', data: voucher });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



const updateVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, quantity, discount, startDate, endDate, maxPrice, applicablePaymentMethod, applicableProductTypes } = req.body;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (code) updateFields.code = code;
    if (quantity) updateFields.quantity = quantity;
    if (discount) updateFields.discount = parseFloat(discount) / 100;
    if (maxPrice) updateFields.maxPrice = maxPrice
    if (applicablePaymentMethod) updateFields.applicablePaymentMethod = applicablePaymentMethod;
    if (applicableProductTypes) updateFields.applicableProductTypes = applicableProductTypes;
    if (startDate && endDate) {
      const formatStartDate = format(new Date(startDate), 'dd/MM/yyyy', { locale: vi });
      const formatEndDate = format(new Date(endDate), 'dd/MM/yyyy', { locale: vi });

      const startDateParts = formatStartDate.split('/');
      const endDateParts = formatEndDate.split('/');

      const startDateToUpdate = parse(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`, 'yyyy-MM-dd', new Date(), { locale: vi });
      const endDateToUpdate = parse(`${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`, 'yyyy-MM-dd', new Date(), { locale: vi });

      if (isAfter(startDateToUpdate, endDateToUpdate)) {
        return res.status(404).json({ success: false, error: 'Ngày bắt đầu phải trước ngày kết thúc' });
      }

      updateFields.startDate = formatStartDate;
      updateFields.endDate = formatEndDate;
    }

    const updatedVoucher = await Voucher.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedVoucher) {
      return res.status(404).json({ success: false, error: 'Voucher không tồn tại' });
    }

    res.status(200).json({ success: true, data: updatedVoucher });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



const deleteVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVoucher = await Voucher.findByIdAndDelete(id);
    if (!deletedVoucher) {
      return res.status(404).json({ success: false, error: 'Voucher không tồn tại' });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getVouchers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;

    const skip = (page - 1) * pageSize;

    const vouchers = await Voucher.find()
      .skip(skip)
      .limit(pageSize)
      .lean();

    const totalVouchers = await Voucher.countDocuments();

    res.status(200).json({
      success: true,
      data: vouchers,
      pageInfo: {
        currentPage: page,
        totalPages: Math.ceil(totalVouchers / pageSize),
        totalVouchers: totalVouchers,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getVoucherDetail = async (req, res) => {
  const { voucherId } = req.params;
  try {
    const voucher = await Voucher.findById(voucherId);
    if (!voucher) {
      return res.status(404).json({ success: false, error: 'Voucher not found' });
    }
    res.status(200).json({ success: true, data: voucher });
  } catch (error) {
    console.error('Error fetching voucher detail:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { addVoucher, updateVoucher, deleteVoucher, getVouchers, useVoucher, getVoucherDetail }

