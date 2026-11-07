const form = document.querySelector("#activityForm");
const output = document.querySelector("#output");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const topic = document.querySelector("#topic").value;
    const level = document.querySelector("#level").value;
    const context = document.querySelector("#context").value;

    output.innerHTML = `
        <h3>Generated Activity</h3>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Level:</strong> ${level}</p>
        <p><strong>Context:</strong> ${context}</p>

        <h4>Practice Task</h4>
        <p>
            Create a small JavaScript program that uses ${topic} in the context of
            ${context}. Your task should demonstrate how data can be stored,
            updated, and displayed in a web application.
        </p>

        <h4>Example Challenge</h4>
        <p>
            Build an array containing five items related to ${context}. Display each
            item on the page, add one new item, and then show the updated list.
        </p>

        <h4>Reflection Question</h4>
        <p>
            How does using ${topic} help developers manage information in this type
            of application?
        </p>
    `;
});