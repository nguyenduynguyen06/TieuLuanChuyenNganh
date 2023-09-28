import React , { useState, useEffect} from "react";
import { Button, Modal, Form} from "antd";
import { WrapperHeader} from "../AdminUser/style";
import {PlusOutlined, UploadOutlined} from '@ant-design/icons'
import TableComponent from "../../TableComponents/TableComponents";
import InputComponent from "../../InputComponents/InputComponent";
import { getBase64 } from "../../../ultil";
import { WrapperUploadFile } from "./style";
import * as ProductService from "../../../services/ProductService";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import Loading from "../../LoadingComponents/Loading";

const AdminProduct = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct, setStateProduct] = useState({
        name: '',
        desc: '',
        releaseDate: '',
        warranty: '',
        brand: '',
        cate: '',
        image: ''
    })

    // const mutation = useMutationHooks(
    //     (data) => {
    //         const { 
    //             name,
    //             desc,
    //             releaseDate,
    //             warranty,
    //             brand,
    //             cate, 
    //             image} = data
    //         ProductService.createProduct({
    //                 name,
    //                 desc,
    //                 releaseDate,
    //                 warranty,
    //                 brand,
    //                 cate,
    //                 image
    //         })
    //     }
    // )

    // const {data, isLoading, isSuccess, isError} = mutation
       
    // useEffect(() =>{
    //     if(isSuccess && data?.status === 'OK') {
    //         handleCancel()
    //     }
    // }, [isSuccess])

    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name] : e.target.value
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
      };

    const onFinish = () => {
        // mutation.mutate(stateProduct)
    }

    const handleOnChangeAvatar = async({fileList}) =>{
        const file = fileList[0]
        if(!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }

    return(
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{marginTop: '10px'}}>            
                <Button style={{height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}} onClick={() => setIsModalOpen(true)}>
                    <PlusOutlined style={{fontSize: '60px'}}/>
                </Button>
            </div>
            <div style={{marginTop: '15px'}}>
            <TableComponent/>
            </div>
            <Modal title="Thêm Sản Phẩm" open={isModalOpen} onCancel={handleCancel}>
            {/* <Loading isLoading={isLoading}> */}
            <Form
                name="basic"
                labelCol={{span: 8,}}
                wrapperCol={{span: 16,}}
                style={{maxWidth: 600,}}
                initialValues={{remember: true,}}
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập tên sản phẩm!',
                        },
                    ]}>
                    <InputComponent value={stateProduct.name} onChange = {handleOnChange} name="name"/></Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="desc"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập thông tin mô tả!',
                        },
                    ]}
                    >
                    <InputComponent value={stateProduct.desc} onChange = {handleOnChange} decs="desc"/></Form.Item>
                <Form.Item
                    label="Ngày ra mắt"
                    name="releaseDate"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập ngày ra mắt!',
                        },
                    ]}
                    >
                    <InputComponent value={stateProduct.releaseDate} onChange = {handleOnChange} releaseDate="releaseDate"/></Form.Item>
                <Form.Item
                    label="Hạn bảo hành"
                    name="warranty"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập hạn bảo hành!',
                        },
                    ]}
                    >
                    <InputComponent value={stateProduct.warranty} onChange = {handleOnChange} warranty="warranty"/></Form.Item>
                <Form.Item
                    label="Thương hiệu"
                    name="brand"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập thương hiệu!',
                        },
                    ]}
                    >
                    <InputComponent value={stateProduct.brand} onChange = {handleOnChange} brand="brand"/></Form.Item>
                <Form.Item
                    label="Danh mục"
                    name="cate"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập danh mục!',
                        },
                    ]}
                    >
                    <InputComponent value={stateProduct.cate} onChange = {handleOnChange} cate="cate"/></Form.Item>
                <Form.Item
                    label="Hình ảnh"
                    name="image"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập danh mục!',
                        },
                    ]}
                    >                    
                    <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={5}>
                    <Button icon={<UploadOutlined/>}>Chọn ảnh</Button>
                    {stateProduct?.image && (
                        <img src={stateProduct?.image} style={{
                            height: '60px',
                            width: '60px',
                            objectFit: 'cover',
                            marginLeft: '10px'
                        }} alt="image"/>
                    )}
                    </WrapperUploadFile>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16,}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
                {/* </Loading> */}
            </Modal>
        </div>
    )
}

export default AdminProduct