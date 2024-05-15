import axios from "axios";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const options = {
          headers: {
            "X-RapidAPI-Key": "cf9a37b42bmsh258e5703e97ea26p11d",
            "X-RapidAPI-Host": "url-shortener42.p.rapidapi.com",
          },
        };
        const res = await axios.get(
          `https://url-shortener42.p.rapidapi.com/shorten?url=${encodeURIComponent(
            inputValue
          )}`,
          options
        );
        setShortenLink(res.data.result.full_short_link);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) {
    return <p className="noData">Loading...</p>;
  }
  if (error) {
    return <p className="noData">Something went wrong :(</p>;
  }

  return (
    <>
      {shortenLink && (
        <div className="result">
          <p>{shortenLink}</p>
          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <button className={copied ? "copied" : ""}>
              Copy to Clipboard
            </button>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
};

export default LinkResult;

// cf9a37b42bmsh258e5703e97ea26p11d
