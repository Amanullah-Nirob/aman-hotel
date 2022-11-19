import { DM_Serif_Display,DM_Sans,Roboto } from '@next/font/google';

export const dmFont=DM_Serif_Display({
    display: 'swap',
    weight: '400',
    subsets: ['latin'] 
})

export const dmSansFont=DM_Sans({
    display: 'swap',
    weight: '500',
    subsets: ['latin'] 
})
export const roboto=Roboto({
    display: 'swap',
    weight: '300',
    subsets: ['latin'] 
})