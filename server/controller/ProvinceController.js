const ProvinceModel = require('../Model/ProvinceModel')
const getProvince = async (req, res) => {
    try {
        const provinces = await ProvinceModel.find({}, { _id: 0, 'province.idProvince': 1, 'province.name': 1 });
        res.status(201).json({ success: true, data: provinces[0].province });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const getDistrictsByProvince = async (req, res) => {
    const { idProvince } = req.params;
    try {
        const province = await ProvinceModel.findOne(
            { 'district.idProvince': idProvince },
            { _id: 0, 'district.idProvince': 1,'district.idDistrict': 1,'district.name': 1 }
        );
        if (!province) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy tỉnh/thành phố' });
        }
        const districts = province.district.filter(district => district.idProvince === idProvince);
        res.status(200).json({ success: true, data: districts });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};
const getCommunesByDistrict = async (req, res) => {
    const { idDistrict } = req.params;
    try {
        const district = await ProvinceModel.findOne(
            { 'commune.idDistrict': idDistrict },
            { _id: 0, 'commune.idDistrict': 1, 'commune.idCommune': 1, 'commune.name': 1 }
        );
        if (!district) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy quận/huyện' });
        }
        const communes = district.commune.filter(commune => commune.idDistrict === idDistrict);;
        res.status(200).json({ success: true, data: communes });
    } catch (error) {
        console.error('Loi ne:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};



module.exports = { getProvince,getDistrictsByProvince,getCommunesByDistrict };