import styled from 'styled-components';


export const Container = styled.div`
    background-color: #3D3F43;
    border-radius:10px;
    padding:10px;
    transition: height 1s;
    text-align: right;

    &:hover{
        button{
            opacity: .90;
        }
    }
    
    img{
        max-width: 100%;
        display:block;
        margin-bottom: 10px;
        border-radius: 10px;
        padding-top: 10px;
       
    }

    button{
        
        align-content: end;
        align-items: end;
        width: 15%;
        height: 25px;
        padding: 0 5px;
        border: 2px solid #47494c;
        background:transparent;
        color:black;
        cursor: pointer;
        border-radius: 5px;
        transition: width .3s;
        transition: height .3s;
        opacity: .0;
        &:hover{
            background-color: #47494c;
            height: 26px;
            width: 16%;
           

        }

    
`;

