import React from "react";
import Image from "next/image";
import faqs from "@/utils/faqs";

const FAQ = () => {
  return (
    <div
      itemScope
      itemType="https://schema.org/FAQPage"
      className="flex flex-col items-center justify-center gap-10 bg-gradient-to-br from-zinc-200 via-slate-100 to-gray-50 pt-36 pb-20"
    >
      <h1>
        <span className="heading-underline">Fr</span>equently Asked Questions
      </h1>
      {faqs.map((item, index) => {
        return (
          <div
            key="index"
            className={`flex ${
              index % 2 === 0
                ? "flex-col lg:flex-row lg:hover:-rotate-1"
                : "flex-col lg:flex-row-reverse lg:hover:rotate-1"
            } w-11/12 items-center justify-around border-2 border-zinc-50 bg-white p-4 shadow-lg transition-all duration-200 ease-in-out hover:shadow-xl lg:w-2/3 lg:p-3 lg:hover:scale-105`}
          >
            <img src={item.image} alt="faq-image" />
            <div
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className="flex flex-col p-5"
            >
              <h4 itemProp="name" className="pb-3 font-semibold">
                {item.question}
              </h4>
              <p
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              ></p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;
