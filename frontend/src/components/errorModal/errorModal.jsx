import React, {useEffect} from 'react'

const ErrorModal = ({modalText, setModalVisible, modalVisible}) =>  {

    const handleModalClose = () => {
        setModalVisible(false)
    }

    useEffect( () => {
        setTimeout( () => setModalVisible(false), 5000)
    }, [modalVisible])


    return (
        <div className="modal-container animate__animated animate__fadeInDown">
            <div>{modalText}</div>
            <div onClick={handleModalClose} className="close-modal"><i className="fa fa-close"></i></div>
        </div>
    )
}

export default ErrorModal