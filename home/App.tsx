import "../src/reset.css";
import "./App.css";

export default function App() {
	return (
		<main>
			<header>IZUMIANO</header>
			<ul>
				<li>
					<a href="/celeste-time-tools/">Celeste Time Tools</a>
				</li>
				<li>
					<a
						href={`${import.meta.env.DEV ? "https://izumiano.github.io" : ""}/celesteStats/`}
					>
						Celeste Stats
					</a>
				</li>
				<li>
					<a href="https://izumiano-animelist.pages.dev">Anime List</a>
				</li>
				<li>
					<a href="https://gamebanana.com/mods/464283">izumisQOL</a>
				</li>
			</ul>
		</main>
	);
}
