document.addEventListener('DOMContentLoaded', () => {
    const brandFilter = document.getElementById('filter-brand');
    const bodyFilter = document.getElementById('filter-body');
    const yearFilter = document.getElementById('filter-year');
    const fuelFilter = document.getElementById('filter-fuel');
    const sortOrder = document.getElementById('sort-order');
    const resetBtn = document.getElementById('reset-filters');
    const cards = Array.from(document.querySelectorAll('.car-card'));
    const grid = document.getElementById('cars-grid');
    const countDisplay = document.getElementById('car-count');

    // Run filter
    function runFilters() {
        const brand = brandFilter.value;
        const body = bodyFilter.value;
        const year = yearFilter.value;
        const fuel = fuelFilter.value;
        
        let visibleCount = 0;

        cards.forEach(card => {
            const cardBrand = card.getAttribute('data-brand');
            const cardBody = card.getAttribute('data-body');
            const cardYear = parseInt(card.getAttribute('data-year'));
            const cardFuel = card.getAttribute('data-fuel');

            let match = true;

            if (brand !== 'all' && cardBrand !== brand) match = false;
            if (body !== 'all' && cardBody !== body) match = false;
            if (year !== 'all' && cardYear < parseInt(year)) match = false;
            if (fuel !== 'all' && cardFuel !== fuel) match = false;

            if (match) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        countDisplay.textContent = visibleCount;
        sortCards();
    }

    function sortCards() {
        const order = sortOrder.value;
        
        const visibleCards = cards.filter(card => card.style.display !== 'none');
        
        visibleCards.sort((a, b) => {
            if (order === 'newest') {
                return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
            } else if (order === 'price-low') {
                return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
            } else if (order === 'price-high') {
                return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
            }
            return 0;
        });

        grid.innerHTML = '';
        if (visibleCards.length === 0) {
            grid.innerHTML = `
                <div class="empty-state text-center" style="padding: 50px 20px; width: 100%; grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <i class="fas fa-car" style="font-size: 4rem; color: #ccc; margin-bottom: 20px;"></i>
                    <h3 style="margin-bottom: 10px; color: #333;">No vehicles available at the moment</h3>
                    <p style="color: #666; margin-bottom: 25px;">Please check back later or contact us for available cars</p>
                    <a href="contact.html" class="btn btn-primary">Contact Us</a>
                </div>
            `;
        } else {
            visibleCards.forEach(card => grid.appendChild(card));
        }
    }

    [brandFilter, bodyFilter, yearFilter, fuelFilter].forEach(filter => {
        filter.addEventListener('change', runFilters);
    });

    sortOrder.addEventListener('change', sortCards);

    resetBtn.addEventListener('click', () => {
        brandFilter.value = 'all';
        bodyFilter.value = 'all';
        yearFilter.value = 'all';
        fuelFilter.value = 'all';
        sortOrder.value = 'newest';
        runFilters();
    });

    // Run initialization step
    runFilters();
});
