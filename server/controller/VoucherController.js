const Voucher = require('../Model/VourcherModel');
const moment = require('moment');

const addVoucher = async (req, res) => {
    try {
      const { name, code, startDate, endDate, quantity, discount } = req.body;
      const startDateParts = startDate.split('/');
      const startDate1 = moment(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`, 'YYYY-MM-DD').tz('Asia/Ho_Chi_Minh');
      const endDateParts = endDate.split('/');
      const endDate1 = moment(`${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`, 'YYYY-MM-DD').tz('Asia/Ho_Chi_Minh');
      if(endDate1 <= startDate1)
      {
        res.status(400).json({ success: false, message:'Ngày kết thúc phải lớn hơn'})
      } else {
        const discountPercentage = parseFloat(discount) / 100;
        const voucher = new Voucher({
        name,
        code,
        startDate,
        endDate,
        quantity,
        discount: discountPercentage,
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

      const voucher = await Voucher.findOne({ code });

      if (!voucher) {
        return res.status(400).json({ success: false, error: 'Mã voucher không tồn tại.' });
      }

      const currentDate = moment().tz('Asia/Ho_Chi_Minh');

  
      const startDateParts = voucher.startDate.split('/');
      const startDate = moment(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`, 'YYYY-MM-DD').tz('Asia/Ho_Chi_Minh');
      const endDateParts = voucher.endDate.split('/');
      const endDate = moment(`${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`, 'YYYY-MM-DD').tz('Asia/Ho_Chi_Minh');
      if (currentDate < startDate) {
        return res.status(400).json({ success: false, error: 'Voucher chưa có hiệu lực.' });
      }
      if (currentDate > endDate) {
        return res.status(400).json({ success: false, error: 'Voucher không còn hiệu lực.' });
      }

      if (voucher.quantity <= 0) {
        return res.status(400).json({ success: false, error: 'Số lượng voucher đã hết.' });
      }

      res.status(200).json({ success: true, message: 'Mã voucher hợp lệ' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};



  const updateVoucher = async (req, res) => {
    try {
      const { id } = req.params;
     
      const updatedVoucher = await Voucher.findByIdAndUpdate(id);
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
      res.status(204).json({ success: true, data: null });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  const getVouchers = async (req, res) => {
    try {
      const vouchers = await Voucher.find();
      res.status(200).json({ success: true, data: vouchers });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
module.exports = {addVoucher,updateVoucher,deleteVoucher,getVouchers,useVoucher}    
  
  