/**
 * Handle Contact and Sell Car form submissions
 * Integrates with Supabase Database
 */
document.addEventListener('DOMContentLoaded', () => {

    // Helper function to show status messages
    const showStatus = (element, message, isError = false) => {
        if (!element) return;
        element.textContent = message;
        element.style.color = isError ? '#e74c3c' : '#2ecc71';
        element.style.padding = '10px';
        element.style.borderRadius = '4px';
        element.style.backgroundColor = isError ? 'rgba(231, 76, 60, 0.1)' : 'rgba(46, 204, 113, 0.1)';
        
        // Hide message after 5 seconds if success
        if (!isError) {
            setTimeout(() => {
                element.textContent = '';
                element.style.padding = '0';
            }, 5000);
        }
    };

    // --- Contact Form ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!window.supabaseClient) {
                alert("Error: Supabase is not loaded. Please make sure you have internet access and do a Hard Refresh (Ctrl + F5).");
                return;
            }
            
            const submitBtn = document.getElementById('contact-submit');
            const statusDiv = document.getElementById('contact-status');
            
            // Get values
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const phone = document.getElementById('contact-phone').value;
            const message = document.getElementById('contact-message').value;

            // Update UI State
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            statusDiv.textContent = '';

            try {
                // Insert into Supabase `contact` table
                const { data, error } = await window.supabaseClient
                    .from('contact')
                    .insert([
                        { name, email, phone, message }
                    ]);

                if (error) throw error;

                showStatus(statusDiv, 'Thank you! Your message has been sent successfully.');
                contactForm.reset();

            } catch (error) {
                console.error('Error inserting contact message:', error);
                showStatus(statusDiv, `Failed to send message: ${error.message || 'Please try again later or check your database constraints.'}`, true);
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // --- Sell Your Car Form ---
    const sellForm = document.getElementById('sell-form');
    if (sellForm) {
        sellForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!window.supabaseClient) {
                alert("Error: Supabase is not loaded. Please make sure you have internet access and do a Hard Refresh (Ctrl + F5).");
                return;
            }
            
            const submitBtn = document.getElementById('sell-submit');
            const statusDiv = document.getElementById('sell-status');

            // Gather inputs
            const full_name = document.getElementById('sell-full-name').value;
            const phone_number = document.getElementById('sell-phone').value;
            const email_address = document.getElementById('sell-email').value;
            const make_brand = document.getElementById('sell-make').value;
            const model = document.getElementById('sell-model').value;
            const year = document.getElementById('sell-year').value;
            const mileage = document.getElementById('sell-mileage').value;
            const price_expectation = document.getElementById('sell-price').value;
            const additional_note = document.getElementById('sell-note').value;
            
            // File input logic (just saving names for now as actual upload requires storage bucket)
            const photoInput = document.getElementById('sell-photos');
            let upload_photos = '';
            if (photoInput.files.length > 0) {
                const names = [];
                for (let i = 0; i < photoInput.files.length; i++) {
                    names.push(photoInput.files[i].name);
                }
                upload_photos = names.join(', ');
            }

            // Update UI State
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.textContent = 'Submitting Request...';
            submitBtn.disabled = true;
            statusDiv.textContent = '';

            try {
                // Insert into Supabase `sell_your_car` table
                const { data, error } = await window.supabaseClient
                    .from('sell_your_car')
                    .insert([
                        { 
                            full_name, 
                            phone_number, 
                            email_address, 
                            make_brand, 
                            model, 
                            year, 
                            mileage: mileage ? parseFloat(mileage) : null, 
                            price_expectation: price_expectation ? parseFloat(price_expectation) : null, 
                            upload_photos, 
                            additional_note 
                        }
                    ]);

                if (error) throw error;

                showStatus(statusDiv, 'Success! We have received your car details and will contact you shortly.');
                sellForm.reset();

            } catch (error) {
                console.error('Error inserting sell car request:', error);
                showStatus(statusDiv, `Submission failed: ${error.message || 'Please verify your Supabase table columns match exactly.'}`, true);
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // --- Newsletter Form ---
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!window.supabaseClient) {
                alert("Error: Supabase is not loaded. Please make sure you have internet access and do a Hard Refresh (Ctrl + F5).");
                return;
            }

            const emailInput = form.querySelector('input[type="email"]');
            const submitBtn = form.querySelector('button[type="submit"]');
            
            if (!emailInput || !emailInput.value) return;

            const email = emailInput.value;
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.textContent = 'Wait...';
            submitBtn.disabled = true;

            try {
                // Insert into Supabase `newsletter` table
                const { error } = await window.supabaseClient
                    .from('newsletter')
                    .insert([{ email }]);

                if (error) throw error;

                alert('Thank you for subscribing to our newsletter!');
                form.reset();
            } catch (error) {
                console.error('Newsletter error:', error);
                alert('Subscription failed: ' + (error.message || 'Please verify your Supabase newsletter table.'));
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    });

});
