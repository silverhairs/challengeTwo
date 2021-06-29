import Head from "next/head";
import { useState, useEffect } from "react";
import PageBody from "@components/PageBody";

export default function Index() {
  const [inputState, setInputState] = useState({ value: "" });
  const [searchState, setSearchState] = useState({
    status: "idle",
    photos: [],
  });
  const [notification, setNotification] = useState({
    isVisible: false,
    msg: "",
  });

  const handleSearch = () => {
    if (!Number.isInteger(parseInt(inputState.value))) {
      setNotification({ isVisible: true, msg: "Please enter integers only!" });
      throw Error("Please enter an integer");
    }
    setSearchState({ ...searchState, status: "loading" });
    fetch(`https://challenge-three.herokuapp.com/${inputState.value}`)
      .then((res) => {
        if (!res.ok) {
          setNotification({
            isVisible: true,
            msg: "Couldn't fetch the albums!",
          });
          throw Error("Failed to fetch albums");
        }
        return res.json();
      })
      .then((data) => {
        setNotification({ ...notification, isVisible: false });
        setSearchState({ status: "success", photos: data });
      })
      .catch((e) => {
        setSearchState({ ...searchState, status: "failure" });
      });
  };

  useEffect(() => {
    if (searchState.status === "success") {
      setTimeout(() => {
        setSearchState({ ...searchState, status: "idle" });
      }, 3000);
    }
  }, [searchState.status]);

  return (
    <div className="home">
      <Head>
        <title>
          ChallengeThree: Challenge two remastered(with custom backend)
        </title>
      </Head>
      <header className="pt-6 pb-3">
        <p className="title has-text-centered">ChallengeThree</p>
        <p className="subtitle has-text-centered">
          by
          <a
            href="http://github.com/silverhairs"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Boris Kayi
          </a>
        </p>
        {notification.isVisible ? (
          <div className="alert">
            <div className="notification is-danger is-light my-4">
              <button
                className="delete"
                onClick={() =>
                  setNotification({ ...notification, isVisible: false })
                }
              ></button>
              {notification.msg}
            </div>
          </div>
        ) : (
          <span></span>
        )}
        <div className="searchbar px-2">
          <div className="container">
            <div className="field">
              <div className="control">
                <input
                  value={inputState.value}
                  className="input is-rounded"
                  type="text"
                  placeholder="Search album ID"
                  onChange={(e) => setInputState({ value: e.target.value })}
                />
              </div>
            </div>
            <div className="action">
              <button
                className="button is-link is-rounded"
                onClick={handleSearch}
              >
                Get Album Photos By Id
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <PageBody status={searchState.status} photos={searchState.photos} />
      </main>
      <footer className="py-5">
        <p className="is-size-7 has-text-centered	">
          Crafted with 💙️ by
          <a
            href="https://github.com/silverhairs"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Boris Kayi.
          </a>
        </p>
      </footer>
    </div>
  );
}
