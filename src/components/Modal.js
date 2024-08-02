import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Info from './Info';
import Edit from './Edit';
import Alert from './Alert';

export default function PopupWindow(props) {
    const [alert, setAlert] = useState({message: "",type: ""});
    const [showPopup, setShwPopup] = useState(false);
    const [modalState, setModalState] = useState({
      text: 'Edit',
      icon: faPencil,
      type: 'primary',
      edit: false,
    });

    const handleClose = () => {
      setShwPopup(false);
    }

    const handleEdit = () => {
      setModalState({
        text: modalState.edit ? 'Edit' : 'Cancel',
        icon: modalState.edit ?  faPencil: faClose,
        type: modalState.edit ? 'primary': 'danger',
        edit: !modalState.edit
      });
    }

    return (
      <div>
        <button className="btn text-light text-decoration-underline me-2" onClick={() => setShwPopup(true)}>
          {props.children}
        </button>
        {
          !modalState.edit && showPopup ? 
            <>
              <div className="popup-window pop-up">
                <button className="btn btn-danger mb-2 close-popup" onClick={handleClose}>
                  <FontAwesomeIcon icon={faClose} />
                </button>
                <div className='pop-container w-75'>
                  {
                  props.type === 'user' && props.content ?
                    <button className={`btn btn-${modalState.type} mb-2 edit-popup`}onClick={handleEdit}>
                      {modalState.text} <FontAwesomeIcon icon={modalState.icon} />
                    </button>
                  : null
                  }
                  <Alert alert={alert} setAlert={setAlert}/>
                  <Info content={props.content} type={props.type} sid={props.sid}/>
                </div>
              </div>
            </>
          : modalState.edit && showPopup ?
            <>
              <div className="popup-window pop-up">
                <button className="btn btn-danger mb-2 close-popup" onClick={handleClose}>
                  <FontAwesomeIcon icon={faClose} />
                </button>
                <div className='pop-container w-75'>
                    {
                      props.type === 'user' && props.content?
                      <button className={`btn btn-${modalState.type} mb-2 edit-popup`} onClick={handleEdit}>
                          {modalState.text} <FontAwesomeIcon icon={modalState.icon} />
                        </button>
                      : null
                    }
                  <div className='popup-card'>
                    <Edit userInfo={props.content} sid={props.sid} setAlert={setAlert} setShwPopup={setShwPopup} render={props.render} handleEdit={handleEdit}/>
                  </div>
                </div>
              </div>
            </>
          : null
        }
      </div>
    )
}
