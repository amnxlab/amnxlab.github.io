async function loadPublications() {
    try {
        const resp = await fetch('../publications.json');
        const pubs = await resp.json();
        renderPublications(pubs);
    } catch (e) {
        console.error('Failed to load publications:', e);
        document.getElementById('publications-list').innerText = 'Unable to load publications.';
    }
}

function renderPublications(pubs) {
    // sort by year desc
    pubs.sort((a, b) => b.year - a.year);

    const years = Array.from(new Set(pubs.map(p => p.year))).sort((a,b)=>b-a);
    const yearSelect = document.getElementById('year-filter');
    years.forEach(y => {
        const opt = document.createElement('option');
        opt.value = String(y);
        opt.textContent = String(y);
        yearSelect.appendChild(opt);
    });

    const list = document.getElementById('publications-list');
    list.innerHTML = '';

    pubs.forEach(p => list.appendChild(publicationCard(p)));

    yearSelect.addEventListener('change', () => applyFilters(pubs));
    document.getElementById('search').addEventListener('input', () => applyFilters(pubs));
}

function applyFilters(pubs) {
    const year = document.getElementById('year-filter').value;
    const q = document.getElementById('search').value.trim().toLowerCase();
    const list = document.getElementById('publications-list');
    list.innerHTML = '';

    pubs.filter(p => {
        if (year !== 'all' && String(p.year) !== year) return false;
        if (!q) return true;
        const hay = (p.title + ' ' + (p.authors||[]).join(' ') + ' ' + (p.venue||'')).toLowerCase();
        return hay.includes(q);
    }).forEach(p => list.appendChild(publicationCard(p)));
}

function publicationCard(p) {
    const wrap = document.createElement('article');
    wrap.className = 'pub-card';
    wrap.style.padding = '1em';
    wrap.style.marginBottom = '1em';
    wrap.style.border = '1px solid var(--global-border-color)';
    wrap.style.borderRadius = '6px';

    const h = document.createElement('h3');
    h.textContent = p.title;
    wrap.appendChild(h);

    const meta = document.createElement('div');
    meta.style.marginBottom = '0.6em';
    meta.textContent = `${(p.authors||[]).join(', ')} — ${p.venue} (${p.year})`;
    wrap.appendChild(meta);

    if (p.abstract) {
        const ab = document.createElement('p');
        ab.textContent = p.abstract;
        wrap.appendChild(ab);
    }

    const links = document.createElement('p');
    if (p.doi) {
        const a = document.createElement('a');
        a.href = `https://doi.org/${p.doi}`;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = 'DOI';
        links.appendChild(a);
        links.appendChild(document.createTextNode(' '));
    }
    if (p.pdf) {
        const b = document.createElement('a');
        b.href = p.pdf;
        b.target = '_blank';
        b.rel = 'noopener';
        b.textContent = 'PDF';
        links.appendChild(b);
    }
    wrap.appendChild(links);

    return wrap;
}

// bootstrap
document.addEventListener('DOMContentLoaded', loadPublications);
