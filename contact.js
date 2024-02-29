const renderContactDetails = () => {

    const contactDetailsDiv = document.createElement("div", "", [{ name: "id", value: "contact-details" }]);

    const our_email_text = createElement("strong", "Email: ");
    const our_email = createElement("p", "info@b1_crypto.com\n");
    const our_phone_text = createElement("strong", "Phone: ");
    const our_phone = createElement("p", "+1 (555) 123-4567");

    contactDetailsDiv.appendChild(our_email_text);
    contactDetailsDiv.appendChild(our_email);
    contactDetailsDiv.appendChild(our_phone_text);
    contactDetailsDiv.appendChild(our_phone);

    const tabPage = document.querySelector("#tab-Contact");
    tabPage.appendChild(contactDetailsDiv);

}

const renderContactForm = () => {
    const contact_form_div = createElement("div", "");
    contact_form_div.classList = "contact-form";
    const contact_form_title = createElement("h2", "Send us a Message");

    const contact_form = createElement("form", "", [ {name: "action", method: "#"}, {name: "method", method: "post"} ]);
    const name_title = createElement("label", "Your Name:", [ {name: "for", value: "name"} ]);
    const name_input = createElement("input", "", [ {name: "type", value: "text"},
                                                    {name: "id", value: "name"},
                                                    {name: "name", value: "name"},
                                                    {name: "required"}]);


    const email_title = createElement("label", "Your Email:", [ {name: "for", value: "email"} ]);
    const email_input = createElement("input", "", [ {name: "type", value: "email"},
                                                    {name: "id", value: "email"},
                                                    {name: "name", value: "email"},
                                                    {name: "required"}]);

    const msg_title = createElement("label", "Your Message:", [ {name: "for", value: "message"} ]);
    const msg_input = createElement("textarea", "", [ {name: "rows", value: "3"},
                                                    {name: "id", value: "message"},
                                                    {name: "name", value: "message"},
                                                    {name: "required"}]);

    const submit_btn = createElement("button", "Send Message", [ {name: "type", value: "submit"} ]);

    const tabPage = document.querySelector("#tab-Contact");
    
    contact_form_div.appendChild(contact_form_title);

    contact_form.appendChild(name_title);
    contact_form.appendChild(name_input);
    contact_form.appendChild(email_title);
    contact_form.appendChild(email_input);
    contact_form.appendChild(msg_title);
    contact_form.appendChild(msg_input);
    contact_form.appendChild(submit_btn);

    contact_form_div.appendChild(contact_form);

    tabPage.appendChild(contact_form_div);

}

const renderContactPage = () => {
    const tabPage = document.querySelector("#tab-Contact");
    tabPage.classList = "tab-content hidden";
  
    const paragraph = createElement("p", "Have questions or feedback? We'd love to hear from you!");
    tabPage.appendChild(paragraph);

    renderContactDetails();
    renderContactForm();
}

renderContactPage();