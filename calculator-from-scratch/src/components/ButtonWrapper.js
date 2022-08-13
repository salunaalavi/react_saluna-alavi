import './ButtonWrapper.css' 

const ButtonWrapper = ({ children }) => {
    return (
        <div className="button-wrapper">{ children }</div>
    )
}

export default ButtonWrapper