import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import Feed from "./Feed";

const FinanceFeed = (props) => {
  const [data, setData] = useState([]);

  const { topPost, lastPost, showHeader } = props;


  useEffect(() => {
    const urls = [
      "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664",
    ];

    Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((res) => res.text())
          .then((data) => {
            const xml = new XMLParser().parseFromString(data).children[0]
              .children;
            const xmlfiltered = xml.filter((obj) => {
              return obj.name === "item";
            });
            const feeds = xmlfiltered.slice(topPost, lastPost).map((elem) => ({
              link: elem.children[0].value,
              title: elem.children[5].value,
              description: elem.children[6].value,
              pubDate: elem.children[7].value,
            }));
            setData(feeds);
          })
      )
    ).catch((err) => console.log(err));
  }, [topPost, lastPost, showHeader]);

  return (
    <div className="d-flex p-3 gap-3 flex-column rounded shadow-sm bg-white mb-3">
      {showHeader ? <h1>Trending news</h1> : ""}
      {data &&
        data.map((item, index) => (
          <Feed
            key={index}
            title={item.title}
            description={item.description}
            link={item.link}
            pubDate={item.pubDate}
          />
        ))}
    </div>
  );
};

export default FinanceFeed;
