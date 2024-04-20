import { useRef, useState } from "react";
import "./css/MainCarousel.css";

const ReviewSection = () => {
  const form = useRef(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const data = new FormData(form.current);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      setIsSubmitted(false);
    });

    // alert("Thank you for your review!");
  };

  return (
    <div class="feed">
      <h2>WRITE A REVIEW</h2>
      <div class="feed_form">
        <form
          name="submit-googlesheet"
          method="post"
          action="https://script.google.com/macros/s/AKfycbwinfnQA8IcsVQ-QP20BdPKpCPAnhCNuF3gAAU_ZKpnaHV92RCPswSsaasb4pmAQUqJSw/exec"
          ref={form}
          onSubmit={handleSubmit}
        >
          <input type="text" name="Name" placeholder="Name" />
          <br />
          <input type="email" name="Email" placeholder="Email ID" />
          <br />
          <input type="text" name="Number" placeholder="Contact Number" />
          <br />
          <textarea
            rows="5"
            cols="7"
            name="Review"
            placeholder="Write your review"
          />
          <br />
          {/* <button type="submit">Submit</button> */}

          {isSubmitted ? (
            <button type="submit" disabled>
              Submitting...
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;
