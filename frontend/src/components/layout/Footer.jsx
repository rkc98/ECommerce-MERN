import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    return (
        <Conatiner>
            <Left>
                <Logo>
                    E-commerce

                </Logo>
                <Desc>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ex sint error
                    deleniti illo reiciendis perspiciatis deserunt eos quo eveniet.
                </Desc>
                <SocialContainer>
                    <SocialIcon bgcolor="#3b5999">
                        <Facebook />
                    </SocialIcon >
                    <SocialIcon bgcolor="#e4405f">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon bgcolor="#55acee">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon bgcolor="#e600ce">
                        <Pinterest />
                    </SocialIcon>


                </SocialContainer>
            </Left>
            <Center>
                <Title>
                    Usefull Links
                </Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>

            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ marginRight: "10px" }} /> 622 Dixie Path , South Tobinchester 98336
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: "10px" }} /> contact@lama.dev
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>


        </Conatiner>
    )
}


const Conatiner = styled.div`
  display: flex;
`
const Left = styled.div`
display: flex;
flex-direction: column;
flex:1;
padding: 20px;
`
const Center = styled.div`
flex:1;
padding: 20px;
`
const Right = styled.div`
flex:1;
padding: 20px;
`

const Title = styled.h3`
`
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;
const List = styled.ul`
margin: 0;
padding: 0;
list-style: none;
display: flex;
flex-wrap: wrap;
`

const ListItem = styled.li`
width: 50%;
margin-bottom: 10px;
`

const Logo = styled.h1`
font-family: cursive;
margin: 0;
`
const Desc = styled.p`
`

const SocialContainer = styled.div`
display: flex;
`
const SocialIcon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
color: white;
background-color: ${props => props.bgcolor};
display: flex;
justify-content: center;
align-items: center;
margin-left: 10px;
`





export default Footer