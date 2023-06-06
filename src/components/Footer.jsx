import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { githubLink, linkedInLink, portifolioLink } from "../constants";

const Footer = () => {
  return (
    <footer className="w-full border border-t-2">
      <div className="p-2 flex flex-col items-center">
        <p className="">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-gray-500 font-mono">All rights reserved</span>
        </p>
        <div className="flex py-1 gap-2">
          <a target="_blank" href={linkedInLink}>
            <AiFillLinkedin className="rounded-full text-blue-700" size={25} />
          </a>
          <a target="_blank" href={githubLink}>
            <AiFillGithub size={25} />
          </a>
          <a target="_blank" href={portifolioLink}>
            <BiWorld size={25} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
