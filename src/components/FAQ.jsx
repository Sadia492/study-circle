import React from "react";
import faqImg from "../assets/your-skill.jpg";

export default function FAQ() {
  return (
    <div className="w-11/12 mx-auto text-center mb-12">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary from-0 to-70% to-secondary text-transparent bg-clip-text">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-400 mt-4 lg:w-3/5 mx-auto">
        Have questions about using our platform? Check out our frequently asked
        questions below to find answers and get started!Explore our FAQs for
        quick help on creating, submitting, grading assignments, and more.
      </p>
      <div className="flex flex-col lg:flex-row gap-12 justify-center items-center mt-12">
        <div className="flex-1 w-full justify-center items-center flex">
          <img
            className="w-full object-cover rounded-2xl"
            src={faqImg}
            alt=""
          />
        </div>
        <div className="flex-1 space-y-6">
          <div className="collapse collapse-plus bg-gradient-to-br from-secondary to-primary text-white">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              📝 How can I create an assignment?
            </div>
            <div className="collapse-content">
              <p>
                You can create an assignment by logging in to your account and
                navigating to the "Create Assignment" page. Fill in the
                assignment details like title, description, difficulty level,
                marks, and due date, then click "Submit" to create the
                assignment.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 bg-gradient-to-br from-secondary to-primary text-white">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              👩‍🏫 Can I update or delete my assignment?
            </div>
            <div className="collapse-content">
              <p>
                Yes, you can update or delete assignments that you created. If
                you try to update or delete someone else's assignment, you will
                not have the option to do so.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 bg-gradient-to-br from-secondary to-primary text-white">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              📚 How can I submit an assignment?
            </div>
            <div className="collapse-content">
              <p>
                Once you click "View Assignment" on any assignment page, you
                will see a "Take Assignment" button. After completing the
                assignment, you can submit it by providing a Google Docs link
                and a brief note.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 bg-gradient-to-br from-secondary to-primary text-white">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              🕑 How do I give marks to other students' assignments?
            </div>
            <div className="collapse-content">
              <p>
                After logging in and navigating to the "Pending Assignments"
                section, you can review and give marks to the assignments
                submitted by others. You cannot grade your own assignments.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 bg-gradient-to-br from-secondary to-primary text-white">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              🎓 Can I view my attempted assignments?
            </div>
            <div className="collapse-content">
              <p>
                Yes, you can view your submitted assignments under the "My
                Attempted Assignments" section. Here you will see your marks and
                any feedback from the grader.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
