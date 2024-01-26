import { HiOutlineSun } from 'react-icons/hi2';
import { useDarkMode } from '../context/DarkModeContext';
import ButtonIcon from '../ui/ButtonIcon'
import { IoMoonOutline } from "react-icons/io5";
function DarkModeToogle(){
    const{isdarkMode , toogleDarkMode} = useDarkMode()
    return(
        <ButtonIcon onClick={toogleDarkMode}>
        {isdarkMode ? <HiOutlineSun /> :<IoMoonOutline />}
        </ButtonIcon>
    )
}

export default DarkModeToogle