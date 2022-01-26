import React from "react";
import Image from "next/image";
import faqs from "@/utils/faqs";

const FAQ = () => {
  return (
    <div
      itemScope
      itemType="https://schema.org/FAQPage"
      className="pt-36 pb-20 flex flex-col justify-center items-center gap-10 bg-gradient-to-br from-zinc-200 via-slate-100 to-gray-50"
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
            } justify-around items-center w-11/12 lg:w-2/3 p-4 lg:p-3 border-2 bg-white border-zinc-50 shadow-lg lg:hover:scale-105 hover:shadow-xl transition-all duration-200 ease-in-out`}
          >
            <img src={item.image} alt="faq-image" />
            <div
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className="flex flex-col p-5"
            >
              <h4 itemProp="name" className="font-semibold pb-3">
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
