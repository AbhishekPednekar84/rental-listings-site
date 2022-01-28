module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans"],
      },
      fontSize: {
        "xxs": ".65rem",
      },
      backgroundImage: {
        hero: "url(https://ik.imagekit.io/ykidmzssaww/Listings/site-images/jrwyvl3qck6d9lxtkatz_gBw5kYrCax_KAaRH_7Hd.jpg)",
        heroBlur:
          "url(https://ik.imagekit.io/ykidmzssaww/Listings/site-images/jrwyvl3qck6d9lxtkatz_gBw5kYrCax_KAaRH_7Hd.jpg/tr:bl-10)",
        listing1:
          "url(https://ik.imagekit.io/ykidmzssaww/Listings/site-images/rfyz78gdhrrcrim6rnys_l_QNDrw7Ei_.jpg)",
        loginHero:
          "url(https://ik.imagekit.io/ykidmzssaww/Listings/site-images/login-hero_1__i7yLTk4nN.jpg?updatedAt=1639656098809)",
        registerHero:
          "url(https://ik.imagekit.io/ykidmzssaww/Listings/site-images/register-hero_p1x-aBiHwzl.jpg?updatedAt=1639670942676)",
        createListingHero:
          "url(https://ik.imagekit.io/ykidmzssaww/Listings/site-images/add-listing-hero_CMaxG3cr6.jpg?updatedAt=1639721665551)",
        editListingHero:
          "url(https://ik.imagekit.io/ykidmzssaww/Listings/site-images/edit-hero_VQIvrxqcJ.jpg?updatedAt=1640752870119)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
