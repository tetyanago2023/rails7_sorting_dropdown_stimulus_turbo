import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="post-sort"
export default class extends Controller {
  static targets = ["select"];
  connect() {
    console.log("Hello, Stimulus!", this.element);
    console.log(this.selectTarget.value);
  }
  sortPosts() {
    const sortBy = this.selectTarget.value;
    const url = `/posts?sort_by=${sortBy}`;

    // Refresh the page
    // Turbo.visit(url);

    this.doTurboRequest(url);
  }

  doTurboRequest(url) {
    fetch(url, {
      headers: {
        Accept: "text/vnd.turbo-stream.html",
      },
    })
        .then((response) => response.text())
        .then((html) => {
          Turbo.renderStreamMessage(html);
        });
  }
  update() {
    console.log("update");
    this.sortPosts();
  }
}