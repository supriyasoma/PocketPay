
import { parse } from 'path';
import React from 'react';
import { Header } from '.';
import { render,screen } from '@testing-library/react';
describe("Header",()=>{
    test("render header correctly",()=>{
        render(<Header steps={[]} close={true} arrow={true}/>)
        const pocketPay=screen.getByAltText("brand");
        expect(pocketPay).toBeInTheDocument();
    })
})