import React from 'react'
import { Accordion, AccordionSummary, ListItemIcon, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InboxIcon from '@mui/icons-material/Inbox';
import { Link } from 'react-router-dom';


const AccordionWithoutExpend = ({ open, location, subItem, handleDrawerOpen, directionVal }) => {
    const { t } = useTranslation();
    const handleClick = () => {
        if (window.innerWidth < 768) {
            handleDrawerOpen();
        }
    };
    return (
        <Link to={subItem.href} onClick={() => {
            localStorage.setItem('selectedIndex', null)
            handleClick();
        }}>
            <Accordion
                disableGutters
                elevation={0}
                style={{ width: '100%', backgroundColor: 'transparent', direction: directionVal }}
            >
                <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={{ margin: 0, justifyContent: open ? 'start' : 'center' }}
                    sx={{ '&:hover': { backgroundColor: 'var(--primary-color)', color: 'white' }, backgroundColor: location === subItem.href || location === subItem.subHrefEdit || location === subItem.subHref ? 'var(--primary-color)' : 'transparent', color: location === subItem.href || location === subItem.subHref ? 'white' : 'white' }}
                >
                    <ListItemIcon style={{ margin: 0, minWidth: open ? '34px' : '', display: "flex", justifyContent: "center" }}>
                        {<FontAwesomeIcon color='rgba(255, 255, 255, 0.38)' icon={subItem.icon} /> || <InboxIcon />}
                    </ListItemIcon>
                    {open && <Typography color='white' >{t(subItem.label)}</Typography>}
                </AccordionSummary>
            </Accordion>    </Link>
    )
}

export default AccordionWithoutExpend
