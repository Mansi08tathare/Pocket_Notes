
import React, { useState, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

const Modal = (props) => {
  const [formData, setFormData] = useState({ grpName: "", color: "" });
  const setGroups = props.setGroups;
  const groups = props.groups;
  const modalRef = useRef(null);

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const getScreen = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const handleResize = () => setScreenSize(getScreen());
    window.addEventListener("resize", handleResize);

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        props.closeModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeColor = (color) => {
    setFormData({ ...formData, color });
  };

  const handleSubmit = () => {
    if (formData.grpName.length >= 2 && formData.color) {
      const newGroup = [
        ...groups,
        {
          groupName: formData.grpName,
          color: formData.color,
          notes: [],
          id: groups.length,
        },
      ];
      setGroups(newGroup);
      localStorage.setItem("groups", JSON.stringify(newGroup));
      props.closeModal(false);
    }
  };

  const isCreateButtonEnabled = formData.grpName.length >= 2 && formData.color;

  return (
    <>
      {screenSize.width < 989 ? (
       <div className={styles.modalBackgroundMobile}>
       <div className={styles.modalContainerMobile} ref={modalRef}>
         <h2 className={styles.modalHeadingMobile}>Create New Group</h2>

         {/* Group Name Section */}
         <div className={styles.modalRow}>
           <label className={styles.modalGrpMobile}>Group Name</label>
           <input
             type="text"
             className={styles.modalTextMobile}
             name="grpName"
             placeholder="Enter group name"
             onChange={handleChange}
           />
         </div>

         {/* Choose Color Section */}
         <div className={styles.modalRowColor}>
           <label className={styles.modalColorMobile}>Choose Colour</label>
           <div className={styles.colorButtonsContainerMobile}>
             {colors.map((color, index) => (
               <button
                 className={`${styles.colorButtonMobile} ${
                   formData.color === color ? styles.selected : ""
                 }`}
                 key={index}
                 style={{
                   background: color,
                 }}
                 onClick={() => handleChangeColor(color)}
               ></button>
             ))}
           </div>
         </div>

         <button
           className={styles.modalCreateMobile}
           onClick={handleSubmit}
           disabled={!isCreateButtonEnabled}
           style={{
             cursor: isCreateButtonEnabled ? "pointer" : "not-allowed",
           }}
         >
           Create
         </button>
       </div>
     </div>
      ) : (
        <div className={styles.modalBackground}>
          <div className={styles.modalContainer} ref={modalRef}>
            <h2 className={styles.modalHeading}>Create New Group</h2>
            <label className={styles.modalGrp}>Group Name</label>
            <input
              type="text"
              className={styles.modalText}
              name="grpName"
              placeholder="Enter group name"
              onChange={handleChange}
            />
            <label className={styles.modalColor}>Choose Colour</label>
            {colors.map((color, index) => (
              <button
                className={`${styles.colorButton} ${
                  formData.color === color ? "selected" : ""
                }`}
                key={index}
                style={{
                  height: "40px",
                  width: "40px",
                  background: color,
                  borderRadius: "25px",
                  border: "none",
                  marginRight: "10px",
                }}
                onClick={() => handleChangeColor(color)}
              ></button>
            ))}
            <button
              className={styles.modalCreate}
              onClick={handleSubmit}
              disabled={!isCreateButtonEnabled}
              style={{
                cursor: isCreateButtonEnabled ? "pointer" : "not-allowed",
              }}
            >
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
