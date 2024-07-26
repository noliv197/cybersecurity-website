import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Info from './Info';

export default function PopupWindow(props) {
  
    const [showPopup, setShwPopup] = useState(false);

    const handleClose = () => {
        setShwPopup(false);
    }

    return (
      <div>
        <button className="btn text-light text-decoration-underline me-2" onClick={() => setShwPopup(true)}>
          {props.children}
        </button>
        {showPopup ? (
          <div className="popup-window pop-up" onClick={handleClose}>
            <button className="btn btn-danger mb-2 close-popup" onClick={handleClose}>
              <FontAwesomeIcon icon={faClose} />
            </button>
            <Info content={props.content} type={props.type}/>
            {/* <div className='w-50'>
                <p className="popup-message text-center small">{props.message}</p>
            </div> */}
          </div>
        ): null}
      </div>
    )
}
