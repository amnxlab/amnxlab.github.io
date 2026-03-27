function qs(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

async function loadPublication() {
  const slug = qs('slug') || qs('id');
  const root = document.getElementById('pub-root');
  if (!slug) {
    root.innerHTML = '<p>No publication specified. Use ?slug=<id></p>';
    return;
  }
  try {
    const resp = await fetch('../publications.json');
    const pubs = await resp.json();
    const pub = pubs.find(p => p.slug === slug || p.id === slug);
    if (!pub) {
      root.innerHTML = `<p>Publication not found: ${slug}</p>`;
      return;
    }
    renderPublication(pub, root);
  } catch (e) {
    console.error(e);
    root.innerHTML = '<p>Failed to load publication data.</p>';
  }
}

function renderPublication(p, root) {
  root.innerHTML = '';
  const title = document.createElement('h1');
  title.textContent = p.title;
  root.appendChild(title);

  const meta = document.createElement('div');
  meta.textContent = `${(p.authors||[]).join(', ')} — ${p.venue} (${p.year})`;
  meta.style.marginBottom = '0.6em';
  root.appendChild(meta);

  if (p.abstract) {
    const ab = document.createElement('p');
    ab.textContent = p.abstract;
    root.appendChild(ab);
  }

  const links = document.createElement('p');
  if (p.doi) {
    const a = document.createElement('a');
    a.href = `https://doi.org/${p.doi}`;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'View DOI';
    links.appendChild(a);
    links.appendChild(document.createTextNode(' '));
  }
  if (p.pdf) {
    const b = document.createElement('a');
    b.href = `../${p.pdf}`;
    b.target = '_blank';
    b.rel = 'noopener';
    b.textContent = 'Download PDF';
    links.appendChild(b);
  }
  root.appendChild(links);

  // BibTeX export
  const bibBtn = document.createElement('button');
  bibBtn.textContent = 'Copy BibTeX';
  bibBtn.addEventListener('click', () => {
    const bib = toBibTeX(p);
    navigator.clipboard?.writeText(bib).then(()=> bibBtn.textContent='Copied');
  });
  root.appendChild(bibBtn);
}

function toBibTeX(p) {
  const key = p.id || (p.authors?.[0]?.split(' ')?.[1] || 'unknown') + p.year;
  const authors = (p.authors||[]).join(' and ');
  return `@article{${key},\n  title={${p.title}},\n  author={${authors}},\n  journal={${p.venue||''}},\n  year={${p.year}},\n  doi={${p.doi||''}}\n}`;
}

document.addEventListener('DOMContentLoaded', loadPublication);
