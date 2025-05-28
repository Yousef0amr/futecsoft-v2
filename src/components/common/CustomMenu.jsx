import React, { useState } from 'react';
import { menuList } from './../../config/constants';
import { useTranslation } from 'react-i18next';
import AccordionWithExpend from '../sideBar/AccordionWithExpend';
import AccordionWithoutExpend from '../sideBar/AccordionWithoutExpend';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InboxIcon from '@mui/icons-material/Inbox';
import { ListItemIcon, Typography } from '@mui/material';
import AppStrings from '../../config/appStrings';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { ExpandCircleDownRounded } from '@mui/icons-material';
const CustomMenu = ({ open, directionVal, handleDrawerOpen, selected }) => {
    const { t } = useTranslation();

    return (
        <>
            <AccordionWithoutExpend handleDrawerOpen={handleDrawerOpen} open={open} location={selected} subItem={{
                label: AppStrings.home,
                icon: faHome,
                href: '/'

            }} directionVal={directionVal} />
            {
                menuList.map((menu, index) => {
                    return (
                        <Accordion key={`main-${index}`}
                            disableGutters
                            elevation={0}
                            square
                            style={{
                                backgroundColor: 'transparent',
                                width: '100%',
                                color: 'white',
                                direction: directionVal
                            }}
                        >
                            <AccordionSummary
                                expandIcon={open ? <ExpandCircleDownRounded sx={{ color: 'rgba(255, 255, 255, 0.38)' }} /> : null}
                                aria-controls={`panel-${index}-content`}
                                id={`panel-${index}-header`}
                                style={{ margin: 0, justifyContent: open ? 'start' : 'center' }}
                                sx={{ padding: "0 15px", margin: 0, '&:hover': { backgroundColor: 'var(--primary-color)', color: 'white' } }}
                            >
                                <ListItemIcon style={{ margin: 0, minWidth: open ? '34px' : '', display: "flex", justifyContent: "center" }}>
                                    {<FontAwesomeIcon color='rgba(255, 255, 255, 0.38)' icon={menu.icon} /> || <InboxIcon />}
                                </ListItemIcon>
                                {open && <Typography style={{ display: open ? 'block' : 'none', fontSize: '14px' }}>{t(menu.label)}</Typography>}
                            </AccordionSummary>
                            <AccordionDetails sx={{ padding: '4px', color: 'white', }}>
                                {menu.subActions.map((subItem, subIndex) => (
                                    <AccordionWithoutExpend key={`sub-${index}-${subIndex}`} handleDrawerOpen={handleDrawerOpen} open={open} location={selected} subItem={subItem} directionVal={directionVal} />
                                ))}
                            </AccordionDetails>

                        </ Accordion>
                    )
                })
            }   </>
    );


};

export default CustomMenu;
