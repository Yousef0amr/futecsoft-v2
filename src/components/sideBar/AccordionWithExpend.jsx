import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    ListItemIcon,
    Stack,
    useMediaQuery
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslation } from 'react-i18next'
import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import InboxIcon from '@mui/icons-material/Inbox'

const useIsMobile = () => useMediaQuery('(max-width:768px)')

const AccordionWithExpend = ({
    index,
    subIndex,
    open,
    handleDrawerOpen,
    handleExpansion,
    activeAccordion,
    directionVal,
    subItem,
    selected
}) => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()

    const handleClick = () => {
        if (isMobile) {
            handleDrawerOpen()
        }
    }

    const isExpanded = activeAccordion === `main-${index}-${subIndex}` ||
        localStorage.getItem('selectedIndex') === `main-${index}-${subIndex}`

    return (
        <Accordion
            expanded={isExpanded}
            onChange={() => open ? handleExpansion(`main-${index}-${subIndex}`) : handleDrawerOpen()}
            disableGutters
            elevation={0}
            square
            sx={{
                width: '100%',
                bgcolor: 'transparent',
                color: 'white',
                direction: directionVal
            }}
        >
            <AccordionSummary
                expandIcon={open ? <ExpandMoreIcon sx={{ color: 'rgba(255, 255, 255, 0.38)' }} /> : null}
                aria-controls={`panel-${index}-${subIndex}-content`}
                id={`panel-${index}-${subIndex}-header`}
                sx={{
                    '&:hover': {
                        bgcolor: 'var(--primary-color)',
                        color: 'white'
                    }
                }}
            >
                <ListItemIcon sx={{ minWidth: open ? '34px' : 'auto', color: 'inherit' }}>
                    {subItem.icon ? <FontAwesomeIcon icon={subItem.icon} /> : <InboxIcon />}
                </ListItemIcon>
                <Typography
                    sx={{
                        display: open ? 'block' : 'none',
                        fontSize: { xs: '12px', sm: '14px' },
                        ml: 1
                    }}
                >
                    {t(subItem.label)}
                </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ py: 1, color: 'white' }}>
                <Stack sx={{ width: '100%', px: 2 }} spacing={1}>
                    {subItem.subActions.map((action, actionIndex) => (
                        <Link
                            key={`action-${index}-${subIndex}-${actionIndex}`}
                            to={action.href}
                            onClick={handleClick}
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography
                                component="div"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    bgcolor: selected === action.href || selected === action.subHref
                                        ? 'var(--primary-color)'
                                        : 'transparent',
                                    '&:hover': {
                                        bgcolor: 'var(--primary-color)',
                                        color: 'white'
                                    },
                                    fontSize: { xs: '12px', sm: '13px' }
                                }}
                            >
                                {selected === action.href || selected === action.subHref
                                    ? <RadioButtonChecked fontSize="small" />
                                    : <RadioButtonUnchecked fontSize="small" />
                                }
                                <Typography
                                    component="span"
                                    sx={{ fontSize: { xs: '12px', sm: '13px' }, lineHeight: 1.5 }}
                                >
                                    {t(action.label)}
                                </Typography>
                            </Typography>
                        </Link>
                    ))}
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionWithExpend
