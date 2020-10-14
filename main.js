const list = document.querySelector("ul");
const form = document.querySelector("form");

const add_note = (note, id) => {
    let html = `
        <li data-id="${id}">
            <div>${note.Title}</div>
            <div>${note.Note}</div>
            <div>Created: ${note.Created.toDate().toLocaleString()}</div>
            <div>Last modified: ${note.Modified.toDate().toLocaleString()}</div>
            <div>Important: <input type="checkbox" id="importantCheck"></div>
            <button class="btn btn-danger btn-sm my-2" id="delete">Delete</button>
            <button class="btn btn-warning btn-sm my-2" id="edit">Edit</button>
        </li>
    `;

    list.innerHTML += html;
}

const delete_note = (id) => {
    const notes = document.querySelectorAll('li');
    notes.forEach(note => {
        if (note.getAttribute('data-id') === id) {
            note.remove();
        }
    })
}

// Get the notes
db.collection('notes').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        const doc = change.doc;
        if (change.type === 'added') {
            add_note(doc.data(), doc.id);
        } else if (change.type === 'removed') {
            delete_note(doc.id);
        }
    });
});


// Add notes
form.addEventListener('submit', e => {
    e.preventDefault(); // Prevents the page from reloading. 
    const now = new Date();
    const note = {
        Title: form.note_title.value,
        Note: form.note.value,
        Created: firebase.firestore.Timestamp.fromDate(now),
        Modified: firebase.firestore.Timestamp.fromDate(now),
    };
    form.reset();


    db.collection('notes').add(note).then(() => {
        console.log("Note added.")
    }).catch(err => {
        console.log(err);
    });
});

// Update notes
list.addEventListener('click', e => {
    if (e.target.id == "edit") {
        console.log(e);
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('notes').doc(id).update(note_title).then(() => {
            console.log("Note deleted.")
        });

    }
});

// Deleting notes
list.addEventListener('click', e => {
    if (e.target.id == "delete") {
        console.log(e);
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('notes').doc(id).delete().then(() => {
            console.log("Note deleted.")
        });
    }
});