import React, { useState } from "react";
import { Button, DatePicker, Input, Table } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import mealImg from "../../../assets/images/meal.png";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { FaPlus } from "react-icons/fa6";
import { useGetAllMealQuery } from "../../../redux/features/meal/mealApi";



const Meals = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const navigate = useNavigate();
    const { data: meals } = useGetAllMealQuery()
    console.log(meals);


    const showModal = (data) => {
        setIsModalOpen(true);
        setModalData(data);
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Calories",
            key: "calories",
            dataIndex: "calories",
        },
        {
            title: "Carbs",
            key: "carbs",
            dataIndex: "carbs",
        },
        {
            title: "Protiens",
            key: "protiens",
            dataIndex: "protiens",
        },
        {
            title: "Fats",
            key: "fats",
            dataIndex: "fats",
        },
        {
            title: "Action",
            key: "Review",
            aligen: 'center',
            render: (_, data) => (
                <div className="  items-center justify-around textcenter flex">
                    {/* Review Icon */}
                    <img src={exlamIcon} alt="" className="btn  px-3 py-1 text-sm rounded-full  cursor-pointer" onClick={() => showModal(data)} />
                    {/* <Link to={'/reviews'} className="btn bg-black text-white px-3 py-1 text-sm rounded-full">
                 
                  View
                </Link> */}
                </div>
            ),
        },
    ];

    const items = [
        {
            label: (
                <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
                    1st menu item
                </a>
            ),
            key: '0',
        },
        {
            label: (
                <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
                    2nd menu item
                </a>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];

    const data = [];
    for (let index = 0; index < 6; index++) {
        data.push({
            // transIs: `${index + 1}`,
            image: <div className="flex items-center justify-center">
                <img src={mealImg} alt="" className="w-10 h-10" />
            </div>,
            name: "Grilled Chicken Salad",
            category: <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space style={{ color: '#174C6B', backgroundColor: '#C1E8FF', padding: '5px 10px', borderRadius: '5px' }}>
                        <DownOutlined />
                        Lunch
                    </Space>
                </a>
            </Dropdown>,
            calories: "350 kcal",
            carbs: "12g",
            protiens: "35g",
            fats: "8g",
            Review: "See Review",
            date: "16 Apr 2024",
            _id: index,
        });
    }



    return (
        <div>
            <button className="px-6 py-2 min-w-[100px] text-center text-white bg-[#174C6B] border border-[#174C6B] rounded-md active:text-[#174C6B] hover:bg-transparent hover:text-[#174C6B] focus:outline-none focus:ring float-end flex items-center gap-2" onClick={() => navigate("/add-meal")}>
                <FaPlus />
                Add New Meal</button>
            <div className="py-10">
                <div className="rounded-lg border-2 py-4 border-[#174C6B]/80 mt-8 recent-users-table">
                    <div className="flex justify-between px-2">
                        <h3 className="text-2xl text-black mb-4 pl-2">Meal List</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <DatePicker placeholder="Date" className="w-48 border-2 border-[#174C6B]" />
                            <Input placeholder="Subscription" className="w-48 border-2 border-[#174C6B] placeholder:text-[#174C6B]" style={{ border: '2px solid #174C6B' }} />
                            <Input placeholder="User Name" className="w-48 placeholder:text-[#174C6B]" style={{ border: '2px solid #174C6B' }} />
                            {/* <Button style={{ border: 'none', backgroundColor: '#EBF8FF', color: '#174C6B', borderRadius: '8px' }}>
                     <IoSearch />
                   </Button> */}
                            <button style={{ border: 'none', backgroundColor: '#caf0f8', color: '#174C6B', borderRadius: '50%', padding: '7px' }}><IoSearch size={20} /></button>
                        </div>
                    </div>
                    {/* Ant Design Table */}
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{ position: ["bottomCenter"] }}
                        className="rounded-lg"
                    />

                    {/* Dashboard Modal */}
                    <DashboardModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        maxWidth="500px"
                    >
                        <div>
                            <h2 className="text-lg text-center mb-4">User Details</h2>
                            {/* <div className="flex justify-between mb-2 text-gray-600  border-b border-[#79CDFF] pb-1">
              <p>#SL</p>
              <p>{modalData.transIs}</p>
            </div> */}
                            <div className="flex justify-between mb-2 text-gray-600  border-b border-[#79CDFF] pb-1">
                                <p>User Name</p>
                                <p>{modalData.name}</p>
                            </div>
                            <div className="flex justify-between mb-2 text-gray-600  border-b border-[#79CDFF] pb-1">
                                <p>Email</p>
                                <p>{modalData.Email}</p>
                            </div>
                            <div className="flex justify-between mb-2 text-gray-600  border-b border-[#79CDFF] pb-1">
                                <p>Mobile Phone</p>
                                <p>{modalData.Phone}</p>
                            </div>

                            <div className="flex justify-between mb-2 text-gray-600  border-b border-[#79CDFF] pb-1">
                                <p>Date</p>
                                <p>{modalData.transIs}</p>
                            </div>


                            <div className="p-4 mt-auto text-center mx-auto flex items-center justify-center">
                                <button
                                    className="w-[300px] bg-[#174C6B] text-white px-10 h-[50px] flex items-center justify-center gap-3 text-lg outline-none rounded-xl"
                                >
                                    <span className="text-white font-light">Okay</span>
                                </button>
                            </div>
                        </div>
                    </DashboardModal>
                </div>
            </div>
        </div>
    )
}

export default Meals
