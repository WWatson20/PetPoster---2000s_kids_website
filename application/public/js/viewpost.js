function addNewComment(data){
        let commentList = document.getElementById('comment-list');
        let newComment = document.createElement('template');
        newComment.innerHTML=`<div class="commentForm" id="message-${data.commentId}">
                                                            <strong>${data.username}</strong>
                                                                    - ${data.comment}
                                                            <div>${new Date().toLocaleString("en-US",{timeStyle: "long", dateStyle: "long"})}</div>
</div>`;
        commentList.append(newComment.content);
        //document.getElementById(`message-${data.commentId}`).scrollIntoView();
}

document.getElementById('comment-button')
    .addEventListener('click', function(ev){
        event.preventDefault();
            let commentTextElement = document.getElementById('comment-text');
            let commentText = commentTextElement.value;
            let postId = ev.currentTarget.dataset.postid;

            if(!commentText) return;

            fetch("/comments/create", {method: "POST", headers:{
                    "Content-Type": "Application/json"
                },
            body: JSON.stringify({
                    comment : commentText,
                    postId: postId
            })
            })
                .then(response => response.json())
                .then(res_json=>{
                            addNewComment(res_json.data)
                })
    })