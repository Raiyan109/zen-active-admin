import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { Form, Input, Button, Select, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
import { FaAngleLeft } from "react-icons/fa6";
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { CiCamera } from "react-icons/ci";


const AddWorkout = () => {
    const [form] = Form.useForm();
    const [features, setFeatures] = useState([""]);

    const addFeature = () => {
        setFeatures([...features, ""]);
    };

    const removeFeature = (index) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures);
    };

    const onFinish = (values) => {
        console.log('Form Values:', values);
    };
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1); // This takes the user back to the previous page
    };

    const props = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <>
            <div className="flex items-center gap-2 text-xl cursor-pointer" onClick={handleBackButtonClick}>
                <FaAngleLeft />
                <h1 className="font-semibold">Add Workout</h1>
            </div>
            <div className="rounded-lg py-4 border-[#79CDFF] border-2 shadow-lg mt-8 bg-white">
                <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
                    <h3 className="text-2xl text-[#174C6B] mb-4 border-b border-[#79CDFF]/50 pb-3 pl-16 font-semibold">
                        Adding Workout
                    </h3>
                    <div className="w-full px-16">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        // style={{ maxWidth: 600, margin: '0 auto' }}
                        >
                            {/* Section 1 */}
                            <Space direction="vertical" style={{ width: '100%', borderBottom: '1px solid #79CDFF' }}>
                                <Space size="large" direction="horizontal" className="responsive-space">
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Workout Title</span>}
                                        name="packageName"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a package name!' }]}
                                    >
                                        <Input type="text" placeholder="Enter Workout Title" style={{
                                            height: '40px',
                                            border: '1px solid #79CDFF',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            color: '#525252',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }} />
                                    </Form.Item>
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Upload Image</span>}
                                        name="packageAmount"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please enter the package amount!' }]}
                                    >
                                        <Upload {...props}>
                                            <Button style={{ width: '440px', height: '40px', border: '1px solid #79CDFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ color: '#525252', fontSize: '16px', fontWeight: 600 }}>Select an image</span>
                                                <CiCamera size={25} color="#174C6B" />
                                            </Button>
                                        </Upload>
                                    </Form.Item>

                                </Space>
                            </Space>

                            {/* Section 2 */}
                            <div className="grid grid-cols-2 gap-8 mt-8">
                                <div>
                                    <h1 className="text-[18px] font-semibold pb-3">Information</h1>
                                    <Space size="large" direction="horizontal" className="responsive-space-section-2">
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Duration</span>}
                                            name="duration"
                                            className="responsive-form-item-section-2"
                                        >
                                            <Input type="number" placeholder="Set duration" style={{
                                                height: '40px',
                                                border: '1px solid #79CDFF',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                color: '#525252',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }} />
                                        </Form.Item>
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Daily Activity</span>}
                                            name="reward points"
                                            className="responsive-form-item-section-2"
                                        >
                                            <Input type="number" placeholder="Set daily activity" style={{
                                                height: '40px',
                                                border: '1px solid #79CDFF',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                color: '#525252',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }} />
                                        </Form.Item>
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Reward Points</span>}
                                            name="reward points"
                                            className="responsive-form-item-section-2"
                                        >
                                            <Input type="number" placeholder="Set reward point" style={{
                                                height: '40px',
                                                border: '1px solid #79CDFF',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                color: '#525252',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }} />
                                        </Form.Item>

                                    </Space>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Form.Item>
                                <div className="p-4 mt-10 text-center mx-auto flex items-center justify-center">
                                    <button
                                        className="w-[500px] bg-[#174C6B] text-white px-10 h-[45px] flex items-center justify-center gap-3 text-lg outline-none rounded-md "
                                    >
                                        <span className="text-white font-semibold">Create</span>
                                    </button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddWorkout
