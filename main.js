const list = document.querySelector("ul");
const form = document.querySelector("form");

const add_note = (note, id) => {
    let html = `
        <li data-id="${id}">
            <div>${note.Title}</div>
            <div>${note.Note}</div>
            <div>Created: ${note.Created.toDate().toLocaleString()}</div>
            <div>Last modified: ${note.Modified.toDate().toLocaleString()}</div>
            <button class="btn btn-danger btn-sm my-2">Delete</button>
        </li>
    `;

    list.innerHTML += html;
}

// Get the notes
db.collection('notes').get().then((snapshot) => {
    // What to do, when we have the notes. 
    snapshot.docs.forEach(doc => {
        add_note(doc.data(), doc.id);
    });
}).catch((err) => {
    console.log(err);
});

// Add notes
form.addEventListener('submit', e => {
    e.preventDefault(); // Prevents the page from reloading. 
    const now = new Date();
    const note = {
        Title: form.note_title.value,
        Note: form.note.value,
        Created: firebase.firestore.Timestamp.fromDate(now),
        Modified: firebase.firestore.Timestamp.fromDate(now)
    };

    db.collection('notes').add(note).then(() => {
        console.log("Note added")
    }).catch(err => {
        console.log(err);
    });
});

// Deleting data
list.addEventListener('click', e => {
    if (e.target.tagName == "BUTTON") {
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('notes').doc(id).delete().then(() => {
            console.log("Note deleted.")
        });
    }
});