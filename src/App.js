import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./Components/Table";
import { pageArray, usePageArray } from "./util/PageArray";
import { useMemo } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [header, setHeader] = useState([
    { key: "userId", name: "пользователь" },
    { key: "id", name: "ідентифікатор" },
    { key: "title", name: "заголовок" },
    { key: "body", name: "тіло" },
  ]);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(3);
  const pageArray = usePageArray(totalCount, limit);
  async function gettingPosts(limit, page) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
      {
        params: {
          _limit: limit,
          _page: page,
        },
      }
    );
    setTotalCount(response.headers["x-total-count"]);
    setPosts(response.data);
  }
  useEffect(() => {
    gettingPosts(limit, page);
  }, [page]);

  const switchPage = (p) => {
    setPage(p);
  };
  const handleSort = (method) => {
    const sortPostArray = posts.sort(function (a, b) {
      const titleA = a[method];
      const titleB = b[method];
      console.log(titleA, titleB);
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      if (titleA === titleB) {
        return 0;
      }
    });
    const sortPostArrayNew = [...sortPostArray];
    setPosts(sortPostArrayNew);
  };

  return (
    <div className="App">
      <label for="sort table">You can sort this table</label>
      <select
        id="sort table"
        onChange={(event) => {
          handleSort(event.target.value);
        }}
      >
        <option disabled value="">
          "sort this table"
        </option>
        <option key="title" name="title" value="title">
          "by title"
        </option>
        <option key="body" name="body" value="body">
          "by body"
        </option>
      </select>

      <div>
        <Table header={header} body={posts} changeBody={setPosts} />
      </div>
      <div className="pagebutton">
        {pageArray.map((p) => (
          <span
            key={p}
            className={p === page ? "spanon" : "spanof"}
            onClick={() => switchPage(p)}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
