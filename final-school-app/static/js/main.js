// ============================================
// Rajivnagar Shala Dashboard - Main JS
// ============================================

// sidebar toggle for mobile
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
    let sidebar = document.getElementById('sidebar');
    let menuBtn = document.querySelector('.menu-btn');
    if (sidebar && !sidebar.contains(e.target) && menuBtn && !menuBtn.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});

// open any modal
function openModal(id) {
    document.getElementById(id).classList.add('open');
}

// close any modal
function closeModal(id) {
    document.getElementById(id).classList.remove('open');
}

// show toast notification
function showToast(msg) {
    let toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(function() {
        toast.style.display = 'none';
    }, 2800);
}

// change password modal
function openPassModal() {
    openModal('passModal');
}

function closePassModal() {
    closeModal('passModal');
}

function changePassword() {
    let oldPass = document.getElementById('oldPass').value;
    let newPass = document.getElementById('newPass').value;

    if (!oldPass || !newPass) {
        showToast('⚠️ Please fill both fields.');
        return;
    }

    if (newPass.length < 4) {
        showToast('⚠️ Password must be at least 4 characters.');
        return;
    }

    fetch('/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'old_password=' + encodeURIComponent(oldPass) + '&new_password=' + encodeURIComponent(newPass)
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        if (data.success) {
            showToast('✅ ' + data.msg);
            closePassModal();
            document.getElementById('oldPass').value = '';
            document.getElementById('newPass').value = '';
        } else {
            showToast('❌ ' + data.msg);
        }
    })
    .catch(function() {
        showToast('❌ Network error. Try again.');
    });
}
