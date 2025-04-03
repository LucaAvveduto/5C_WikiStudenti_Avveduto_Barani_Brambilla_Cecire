export function navbar(parentElement) {
  return {
    render: () => {
      parentElement.innerHTML = `
            <nav class="navbar is-transparent">
		<div class="navbar-brand">
			<a class="navbar-item" href="#">
				<img src="assets/favicon.ico" id="logo">
			</a>
			<div class="navbar-burger js-burger" data-target="navbarExampleTransparentExample">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>

		<div id="navbarExampleTransparentExample" class="navbar-menu">
			<div class="navbar-start">
				<a class="navbar-item title is-3" href="">WikiStudenti</a>
			</div>

			<div class="navbar-end">
				<div class="navbar-item">
					<div class="field is-grouped">
						<p class="control">
							<button class="button is-link js-modal-trigger" id="personal" data-target="loginModal">
								<span class="icon">
									<i class="fa-solid fa-user"></i>
								</span>
								<span>Area personale</span>
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	</nav>
            `;

      document.getElementById("personal").onclick = () => {
        document.querySelectorAll(".modal").forEach((e) => {
          if (e.classList.contains("hidden")) e.classList.remove("hidden");
          e.classList.add("blur");
        });
      };
    },
  };
}
