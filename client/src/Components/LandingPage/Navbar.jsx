import React, { useState } from "react";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { WrapperA } from "./style";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        aboutSection.scrollIntoView({ behavior: "smooth" });
    };

    const menuOptions = [
        {
            text: "Trang chủ",
        },
        {
            text: "Đăng ký",
        },
        {
            text: "Đăng nhập",
        },
        {
            text: "Về chúng tôi",
            onClick: scrollToAbout, 
        },
        {
            text: "Giỏ hàng",
            icon: <ShoppingCartOutlined />,
        },
    ];
    return (
        <WrapperA>
            <nav>
                <div className="nav-logo-container">
                    <img src="../../image/didong3.png" alt="" />
                </div>
                <div className="navbar-links-container">
                    <a href="/landingpage">Trang chủ</a>
                    <a href="#" onClick={scrollToAbout}>Về chúng tôi</a>
                    <a href="">Đăng nhập</a>
                    <a href="">Đăng ký</a>
                    <a href="">
                        <ShoppingCartOutlined className="navbar-cart-icon" />
                    </a>
                    <button className="primary-button">Bookings Now</button>
                </div>
                <div className="navbar-menu-container">
                    <ShoppingCartOutlined onClick={() => setOpenMenu(true)} />
                </div>
                <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={() => setOpenMenu(false)}
                        onKeyDown={() => setOpenMenu(false)}
                    >
                        <List>
                            {menuOptions.map((item) => (
                                <ListItem key={item.text} disablePadding>
                                    <ListItemButton href={item.href} onClick={item.onClick}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                    </Box>
                </Drawer>
            </nav>
        </WrapperA>
    );
};

export default Navbar