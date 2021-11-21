import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AddShoppingCartRounded from '@material-ui/icons/AddShoppingCartRounded';
import { Badge } from '@material-ui/core';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';

const Container = styled.div`
display: flex;
flex: 1;
justify-content: space-evenly;
align-items: center;
height: 15vh;
`
const Left = styled.div`
display: flex;
flex: 3;
margin-left: 20px;
`
const Center = styled.div`
flex: 4;
display: flex;
justify-content: space-between;
`
const Right = styled.div`
flex: 3;
display: flex;
justify-content: flex-end;
`
const BrandName = styled.h1`
font-size: 35px;
font-weight: 700;
font-family: cursive;
cursor: pointer;
`
const StyledLink = styled(Link)`
text-decoration: none;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
font-size: 24px;
color: #111111;
`
const Icons = styled.div`
 margin-right : 40px;
`

const Header = () => {
    return (
        <Container>
            <Left>
                <BrandName>E-commerce </BrandName>
            </Left>

            <Center>
                <StyledLink to="/" >Home</StyledLink>
                <StyledLink to="/" >Product</StyledLink>
                <StyledLink to="/" >Contact</StyledLink>
                <StyledLink to="/" >About Us</StyledLink>
            </Center>

            <Right>
                <Icons>
                    <SearchRoundedIcon style={{ cursor: 'pointer', fontSize: "30px" }} />
                </Icons>

                <Icons>
                    <Badge badgeContent={1} color="error">
                        <AddShoppingCartRounded style={{ cursor: 'pointer', fontSize: "30px" }} />
                    </Badge>
                </Icons>

                <Icons>
                    <AccountBoxRoundedIcon style={{ cursor: 'pointer', fontSize: "30px" }} />
                </Icons>
            </Right>
        </Container>
    )
}

export default Header
