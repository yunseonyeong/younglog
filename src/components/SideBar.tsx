import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsBalloonHeartFill } from 'react-icons/bs';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

interface SideBarProps {
    menu: {
        to: string;
        name: string;
    }[];
}

const SideBar = ({ menu }: SideBarProps) => {
    const [showList, setShowList] = useState(false);
    const handleDropdown = () => {
        setShowList(!showList);
    };
    const [visibilityAnimation, setVisibilityAnimation] = useState(false);
    const [repeat, setRepeat] = useState<any>(null);
    useEffect(() => {
        if (showList) {
            clearTimeout(repeat);
            setRepeat(null);
            setVisibilityAnimation(true);
        } else {
            setRepeat(
                setTimeout(() => {
                    setVisibilityAnimation(false);
                }, 220),
            );
        }
    }, [showList]);
    return (
        <Wrapper>
            <MenuDropdown onClick={handleDropdown}>
                글 목록 {showList ?
                    <RiArrowDropUpLine size={25} />
                    : <RiArrowDropDownLine size={25} />}
            </MenuDropdown>
            {visibilityAnimation &&
                <MenuList className={showList ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'}>
                    {menu.map((m, i) => (
                        <MenuItem key={i}>
                            <Link href={`/category/${m.to}`}>
                                <Text><BsBalloonHeartFill />{m.name}</Text>
                            </Link>
                        </MenuItem>
                    ))}
                </MenuList>
            }
        </Wrapper>
    );
};

export default SideBar;

const Wrapper = styled.div`
    width: 200px;
    padding: 20px 10px;
    background-color: #f5f5f5;
    @media (max-width: 900px) {
        display: none;
    }
`;

const MenuItem = styled.div`
    height: 40px;
    width: 100%;
    display: flex;
    padding-left: 20px;
    align-items: center;
`;

const Text = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
`;

const MenuDropdown = styled.div`
    background-color: #f5f5f5;
    width: 100%;
    padding-left: 10px;
    height: 40px;
    display: flex;
    align-items: center;
    gap: 3px;
    z-index: 4;
    position: relative;
`;


const MenuList = styled.div`
    z-index: 2;
    display: flex;
    position: relative;
    flex-direction: column;
    @keyframes slide-fade-out-dropdown-animation {
        0% {
        transform: translateY(0);
        }
        100% {
        transform: translateY(-50px);
        }
    }
  @keyframes slide-fade-in-dropdown-animation {
        0% {
        transform: translateY(-25px);
        }
        100% {
        transform: translateY(0);
        }
  }
    &.slide-fade-in-dropdown {
    animation: slide-fade-in-dropdown-animation 0.4s ease;
  }

  &.slide-fade-out-dropdown {
    animation: slide-fade-out-dropdown-animation 0.3s ease;
    animation-fill-mode: forwards;
  }
`;