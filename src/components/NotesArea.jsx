import React, { useState, useEffect } from "react";
import sendIcon from "../assets/send.png";
import back from "../assets/back.png";
import { getAbbreviation } from "./utils";
import styles from "./NotesArea.module.css";

const NotesArea = ({ groupSelect, groups, setGroups }) => {
  const [note, setNote] = useState("");
  const notes = groupSelect.notes;

  const getScreen = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const handleResize = () => setScreenSize(getScreen());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = () => {
    if (!note.trim()) return; // Prevent empty notes
    const newGroup = [...groups];
    const Cgroup = newGroup[groupSelect.id];
    const date = new Date();

    // Format the date to "11 Nov 2024"
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit", // Ensures the day is always two digits (e.g., "01", "11")
      month: "short", // Abbreviated month name (e.g., "Nov")
      year: "numeric", // Full numeric year (e.g., "2024")
    }).format(date);

    // Format the time to "10:30 AM"
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);

    const dateTime = `${formattedDate} • ${formattedTime}`;
    Cgroup["notes"].push({ dateTime, note });
    localStorage.setItem("groups", JSON.stringify(newGroup));
    setGroups(newGroup);
    setNote("");
  };

  const keypress = (e) => {
    if (e.code === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <div className={styles.notesContainerMobile}>
          <div className={styles.notesHeader}>
            <img
              src={back}
              alt="back"
              onClick={() => window.location.reload()}
            />
            <div
              className={styles.notesGroup}
              style={{ background: groupSelect.color }}
            >
              {getAbbreviation(groupSelect.groupName)}
            </div>
            <h2 className={styles.groupName}>{groupSelect.groupName}</h2>
          </div>

          <div className={styles.NotesAndDateMobile}>
            {notes.map((note, index) => (
              <div className={styles.messageContainer} key={index}>
                <p className={styles.noteText}>{note.note}</p>
                <p className={styles.noteDate}>{note.dateTime}</p>
              </div>
            ))}
          </div>

          <div className={styles.TextareaMobile}>
            <textarea
              className={styles.TextInputMobile}
              type="text"
              value={note}
              onChange={handleChange}
              placeholder="Enter your text here..........."
              onKeyDown={keypress}
            ></textarea>
            <img
              src={sendIcon}
              className={`${styles.SendImgMobile} ${
                note.trim() ? styles.activeSendImg : styles.inactiveSendImg
              }`}
              alt="Send"
              onClick={handleSubmit}
            />
          </div>
        </div>
      ) : (
        <div className={styles.notesContainer}>
          <div className={styles.notesHeader}>
            <div
              className={styles.notesGroup}
              style={{ background: groupSelect.color }}
            >
              {getAbbreviation(groupSelect.groupName)}
            </div>
            <h2 className={styles.groupName}>{groupSelect.groupName}</h2>
          </div>

          <div className={styles.NotesAndDate}>
            {notes.map((note, index) => (
              <div className={styles.messageContainer} key={index}>
                <p className={styles.noteText}>{note.note}</p>
                <p className={styles.noteDate}>{note.dateTime}</p>
              </div>
            ))}
          </div>

          <div className={styles.Textarea}>
            <textarea
              className={styles.TextInput}
              type="text"
              value={note}
              onChange={handleChange}
              placeholder="Enter your text here..........."
              onKeyDown={keypress}
            ></textarea>

            <img
              src={sendIcon}
              className={`${styles.SendImg} ${
                note.trim() ? styles.activeSendImg : styles.inactiveSendImg
              }`}
              alt="Send"
              onClick={handleSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NotesArea;
