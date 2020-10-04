const list = document.querySelector("ul");

const add_note = (note) => {
    let html = `
        <li>
            <div>${note.Title}</div>
            <div>${note.Note}</div>
            <div>Created: ${note.Created.toDate().toLocaleString()}</div>
            <div>Last modified: ${note.Modified.toDate().toLocaleString()}</div>
        </li>
    `;

    list.innerHTML += html;
}

db.collection('notes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        add_note(doc.data());
    });
}).catch((err) => {
    console.log(err);
});