  function setupMobileTooltips() {
            const labIconItems = document.querySelectorAll('.lab-icon-item');

            function isMobileDevice() {
                return window.innerWidth <= 768 ||
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            }

            if (!labIconItems.length) return;

            labIconItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    if (!isMobileDevice()) return;

                    labIconItems.forEach(otherItem => {
                        if (otherItem !== this) {
                            otherItem.classList.remove('active');
                        }
                    });

                    this.classList.toggle('active');

                    const clickToggle = document.getElementById('click-toggle');
                    const clickSound = document.getElementById('clickSound');
                    if (clickToggle && clickToggle.textContent === 'ON' && clickSound) {
                        clickSound.currentTime = 0;
                        clickSound.play().catch(e => console.log('Click sound failed'));
                    }
                });
            });

            document.addEventListener('click', function(e) {
                if (!e.target.closest('.lab-icon-item') && isMobileDevice()) {
                    labIconItems.forEach(item => {
                        item.classList.remove('active');
                    });
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && isMobileDevice()) {
                    labIconItems.forEach(item => {
                        item.classList.remove('active');
                    });
                }
            });

            document.addEventListener('click', function(e) {
                if (e.target.closest('.lab-icon-item') && isMobileDevice()) {
                    setTimeout(() => {
                        labIconItems.forEach(item => {
                            item.classList.remove('active');
                        });
                    }, 3000);
                }
            });
        }

        document.addEventListener('DOMContentLoaded', function() {

            initializeTerminal();
            setupSettingsPanel();
            setupSettingsClose();
            setupNotificationSystem();
            setupFolderToggles();
            setupEntityPanel();
            setupStaffPanel();
            createWorkers();
            setupOriginModals();
            setupImageModal();
            setupMobileTooltips();
            fixPanelOpening();
            initializeImmersiveModesOnce();
            startLoadingSequence();
            setInterval(updateSystemTime, 1000);
            updateSystemTime();
            checkMobileDevice();
            initializeImmersiveModes();
            initializeVHSEffect();
            
        });

        
        function initializeVHSEffect() {
            const vhsOverlay = document.getElementById('vhs-overlay');
            const crtToggle = document.getElementById('crt-toggle');

            if (!vhsOverlay || !crtToggle) return;

            function updateVHSEffect() {
                const crtEnabled = !document.body.classList.contains('crt-disabled');

                if (crtEnabled) {
                    vhsOverlay.style.display = 'block';
                } else {
                    vhsOverlay.style.display = 'none';
                }
            }

            updateVHSEffect();

            if (crtToggle) {
                crtToggle.addEventListener('click', function() {
                    setTimeout(updateVHSEffect, 100);
                });
            }

            if (window.innerWidth <= 768) {

                const vhsElements = vhsOverlay.querySelectorAll('div');
                vhsElements.forEach(el => {
                    if (el.classList.contains('vhs-noise') || el.classList.contains('vhs-scanlines')) {
                        el.style.animationDuration = '0.3s';
                    }
                });
            }
        }

        function updateSystemTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false
            });
            const systemTimeElement = document.getElementById('system-time');
            if (systemTimeElement) {
                systemTimeElement.textContent = timeString;
            }
        }

        function fixPanelOpening() {
            const staffHeader = document.getElementById('staff-header');
            const staffContent = document.getElementById('staff-content');
            const entityHeader = document.getElementById('entity-panel-header');
            const entityContent = document.getElementById('entity-panel-content');

            if (staffHeader && staffContent) {
                staffHeader.addEventListener('click', function() {
                    setTimeout(() => {
                        if (staffContent.classList.contains('expanded')) {
                            staffHeader.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest'
                            });
                        }
                    }, 50);
                });
            }

            if (entityHeader && entityContent) {
                entityHeader.addEventListener('click', function() {
                    setTimeout(() => {
                        if (entityContent.classList.contains('expanded')) {
                            entityHeader.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest'
                            });
                        }
                    }, 50);
                });
            }
        }

        function startLoadingSequence() {
            const fireLoadingScreen = document.getElementById('fire-loading-screen');
            const originalLoadingScreen = document.getElementById('loading-screen');
            const flsLoadingText = document.getElementById('fls-loading-text');
            const flsOpenButton = document.getElementById('fls-open-terminal-btn');
            const mainContent = document.getElementById('main-content');

            if (fireLoadingScreen) {
                fireLoadingScreen.style.display = 'flex';
            }
            if (originalLoadingScreen) {
                originalLoadingScreen.style.display = 'none';
            }

            if (!flsLoadingText || !flsOpenButton) return;

            flsOpenButton.addEventListener('click', function() {

                flsLoadingText.textContent = "INITIALIZING M.R.I.S. OPERATION SYSTEM";
                flsLoadingText.style.animation = "none";
                flsOpenButton.disabled = true;
                flsOpenButton.textContent = "SYSTEM BOOTING...";
                flsOpenButton.style.animation = "none";
                flsOpenButton.style.backgroundColor = "#1a1a1a";
                flsOpenButton.style.color = "#555";
                flsOpenButton.style.borderColor = "#333";
                flsOpenButton.style.boxShadow = "none";

                setTimeout(() => {
                    flsLoadingText.textContent = "ACCESSING OPERATION SYSTEM CORE";

                    const cursor = document.createElement('span');
                    cursor.textContent = '_';
                    cursor.classList.add('fls-cursor');
                    flsLoadingText.appendChild(cursor);

                    setTimeout(() => {
                        if (fireLoadingScreen) {
                            fireLoadingScreen.style.display = 'none';
                        }
                        if (originalLoadingScreen) {
                            originalLoadingScreen.style.display = 'flex';
                        }

                        startOriginalLoadingSequence();
                    }, 1500);

                }, 2000);
            });
        }

        function startOriginalLoadingSequence() {
            const loadingText1 = document.getElementById('loading-text-1');
            const loadingText2 = document.getElementById('loading-text-2');
            const loadingText3 = document.getElementById('loading-text-3');
            const loadingStatus = document.getElementById('loading-status');
            const mainContent = document.getElementById('main-content');

            setTimeout(() => {
                if (loadingText1) loadingText1.style.opacity = '1';

                setTimeout(() => {
                    if (loadingText2) loadingText2.style.opacity = '1';

                    setTimeout(() => {
                        if (loadingText3) loadingText3.style.opacity = '1';

                        setTimeout(() => {
                            if (loadingStatus) loadingStatus.style.opacity = '1';

                            setTimeout(() => {
                                const loadingScreen = document.getElementById('loading-screen');
                                if (loadingScreen) loadingScreen.style.display = 'none';

                                if (mainContent) {
                                    mainContent.style.display = 'block';
                                    setTimeout(() => {
                                        mainContent.style.opacity = '1';

                                        startNotificationAnimation();
                                    }, 100);
                                }
                            }, 1200);

                        }, 1000);
                    }, 1200);
                }, 1200);
            }, 500);
        }

        function setupNotificationSystem() {
            const notificationIcon = document.getElementById('notification-icon');
            const notificationPanel = document.getElementById('notification-panel');
            const notificationClose = document.getElementById('notification-close');
            const notificationBadge = document.getElementById('notification-badge');
            const notificationSound = document.getElementById('notificationSound');
            const settingsPanel = document.getElementById('settings-panel');

            if (!notificationIcon || !notificationPanel) return;

            const hasSeenNotification = localStorage.getItem('mris_notification_seen');

            notificationIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                notificationPanel.classList.toggle('active');

                notificationIcon.classList.remove('pulsing');
                if (notificationBadge) {
                    notificationBadge.style.display = 'none';
                }

                if (settingsPanel && settingsPanel.classList.contains('active')) {
                    settingsPanel.classList.remove('active');
                    const settingsIcon = document.getElementById('settings-icon');
                    if (settingsIcon) {
                        settingsIcon.classList.remove('rotated');
                    }
                }

                localStorage.setItem('mris_notification_seen', 'true');

                const clickToggle = document.getElementById('click-toggle');
                const clickSound = document.getElementById('clickSound');
                if (clickToggle && clickToggle.textContent === 'ON' && clickSound) {
                    clickSound.currentTime = 0;
                    clickSound.play().catch(e => console.log('Click sound failed'));
                }
            });

            if (notificationClose) {
                notificationClose.addEventListener('click', function(e) {
                    e.stopPropagation();
                    notificationPanel.classList.remove('active');
                });
            }

            document.addEventListener('click', function(e) {
                if (!notificationPanel.contains(e.target) && e.target !== notificationIcon) {
                    notificationPanel.classList.remove('active');
                }
            });

            notificationPanel.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }

        function startNotificationAnimation() {
            const notificationIcon = document.getElementById('notification-icon');
            const notificationBadge = document.getElementById('notification-badge');
            const notificationSound = document.getElementById('notificationSound');

            if (!notificationIcon) return;

            const hasSeenNotification = localStorage.getItem('mris_notification_seen');

            if (!hasSeenNotification) {

                setTimeout(() => {

                    notificationIcon.classList.add('pulsing');

                    if (notificationBadge) {
                        notificationBadge.style.display = 'flex';
                    }

                    if (notificationSound) {
                        notificationSound.volume = 0.7;
                        notificationSound.play().catch(e => console.log('Notification sound failed to play'));
                    }

                    setTimeout(() => {
                        notificationIcon.classList.remove('pulsing');
                    }, 10000);

                }, 1200);
            }
        }

        function animateEntityTypes() {
            const entityItems = document.querySelectorAll('.entity-item');
            entityItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'fadeIn 1s ease forwards';
                }, index * 200);
            });
        }

        function createWorkers() {
            const workersGrid = document.getElementById('workers-grid');
            const workerModal = document.getElementById('worker-modal');
            const workerDetails = document.getElementById('worker-details');
            const closeWorkerModal = workerModal ? workerModal.querySelector('.close-modal') : null;

            if (!workersGrid) return;

            const workers = [{
                    id: 1,
                    name: "Prof. K. Novak",
                    status: "active",
                    role: "Professor & Chemist",
                    image: "https://files.catbox.moe/148v3v.png"
                },
                {
                    id: 2,
                    name: "Dr. L. Chen",
                    status: "active",
                    role: "Physicist",
                    image: "https://files.catbox.moe/jkhfn7.png"
                },
                {
                    id: 3,
                    name: "Dr. R. Stone",
                    status: "active",
                    role: "Doctor",
                    image: "https://files.catbox.moe/e9wy8b.png"
                },
                {
                    id: 4,
                    name: "Tech. S. Hayes",
                    status: "active",
                    role: "Physicist",
                    image: "https://files.catbox.moe/p8ce4z.png"
                },
                {
                    id: 5,
                    name: "Eng. J. Cross",
                    status: "active",
                    role: "Chemist",
                    image: "https://files.catbox.moe/3ip556.png"
                },
                {
                    id: 6,
                    name: "Eng. M. Chen",
                    status: "active",
                    role: "Engineer",
                    image: "https://files.catbox.moe/7xe4ne.png"
                },
                {
                    id: 7,
                    name: "Phy. G. Ivanov",
                    status: "active",
                    role: "Physicist",
                    image: "https://files.catbox.moe/d4m77k.png"
                },
                {
                    id: 8,
                    name: "Eng. A. Maison",
                    status: "active",
                    role: "Engineer",
                    image: "https://files.catbox.moe/f3jqcj.png"
                },
                {
                    id: 9,
                    name: "Rs. M. Butler",
                    status: "active",
                    role: "Researcher",
                    image: "https://files.catbox.moe/u3wqcn.png"
                },
                {
                    id: 10,
                    name: "Dr. A. Yamada",
                    status: "active",
                    role: "Chemical Reporter",
                    image: "https://files.catbox.moe/wykas2.png"
                }
            ];

            workers.forEach(worker => {
                const workerItem = document.createElement('div');
                workerItem.classList.add('worker-item');
                workerItem.setAttribute('data-worker-id', worker.id);

                const statusClass = worker.status === 'active' ? 'status-active' : 'status-terminated';
                const statusText = worker.status === 'active' ? '● ACTIVE' : '✗ TERMINATED';

                workerItem.innerHTML = `
                    <img src="${worker.image}" alt="${worker.name}" class="worker-image">
                    <div class="worker-name">${worker.name}</div>
                    <div class="worker-status ${statusClass}">${statusText}</div>
                `;

                workerItem.addEventListener('click', () => {
                    if (!workerModal || !workerDetails) return;

                    const modalStatusClass = worker.status === 'active' ? 'modal-status-active' : 'modal-status-terminated';
                    const modalStatusText = worker.status === 'active' ? '● STATUS: ACTIVE' : '✗ STATUS: TERMINATED';

                    workerDetails.innerHTML = `
                        <img src="${worker.image}" alt="${worker.name}" class="worker-modal-image">
                        <div class="worker-info">
                            <h2 class="worker-modal-name">${worker.name}</h2>
                            <div class="worker-modal-status ${modalStatusClass}">${modalStatusText}</div>
                            <div class="worker-bio">
                                <p><strong>Role:</strong> ${worker.role}</p>
                                ${worker.status === 'terminated' ? '<p><strong>Termination Date:</strong> ' + worker.terminationDate + '</p>' : ''}
                                ${worker.status === 'terminated' ? '<p><strong>Termination Reason:</strong> CLASSIFIED </p>' : ''}
                            </div>
                        </div>
                    `;

                    workerModal.style.display = 'flex';
                });

                workersGrid.appendChild(workerItem);
            });

            if (closeWorkerModal) {
                closeWorkerModal.addEventListener('click', () => {
                    workerModal.style.display = 'none';
                });
            }

            if (workerModal) {
                window.addEventListener('click', (e) => {
                    if (e.target === workerModal) {
                        workerModal.style.display = 'none';
                    }
                });
            }
        }

        function setupStaffPanel() {
            const staffHeader = document.getElementById('staff-header');
            const staffContent = document.getElementById('staff-content');
            const staffToggle = document.getElementById('staff-toggle');

            if (!staffHeader || !staffContent || !staffToggle) return;

            staffContent.classList.remove('expanded');

            staffHeader.addEventListener('click', () => {
                staffContent.classList.toggle('expanded');
                staffToggle.classList.toggle('rotated');
            });
        }

        function setupEntityPanel() {
            const entityPanelHeader = document.getElementById('entity-panel-header');
            const entityPanelContent = document.getElementById('entity-panel-content');
            const entityPanelToggle = document.getElementById('entity-panel-toggle');

            if (!entityPanelHeader || !entityPanelContent || !entityPanelToggle) return;

            entityPanelContent.classList.remove('expanded');
            entityPanelToggle.classList.remove('rotated');

            entityPanelHeader.addEventListener('click', () => {
                entityPanelContent.classList.toggle('expanded');
                entityPanelToggle.classList.toggle('rotated');
            });
        }

      function setupFolderToggles() {
    const folderHeaders = document.querySelectorAll('.folder-header');

    folderHeaders.forEach(header => {
        const toggle = header.querySelector('.folder-toggle');
        const content = header.nextElementSibling;

        if (!toggle || !content) return;

        // Check if it's the Paranormal Entities folder
        const isParanormal = header.querySelector('.folder-title').textContent.includes('Paranormal Entities');
        
        // For ALL folders (including Paranormal), set them to open by default
        content.classList.add('active');
        toggle.classList.add('rotated');
        
        // Update folder icon to "open"
        const folderIcon = header.querySelector('.folder-title i');
        if (folderIcon) {
            folderIcon.className = 'fas fa-folder-open';
        }

        header.addEventListener('click', () => {
            content.classList.toggle('active');
            toggle.classList.toggle('rotated');

            // Update folder icon on click
            if (content.classList.contains('active')) {
                folderIcon.className = 'fas fa-folder-open';
            } else {
                folderIcon.className = 'fas fa-folder';
            }
        });
    });
}

        function setupSettingsPanel() {
            const settingsIcon = document.getElementById('settings-icon');
            const settingsPanel = document.getElementById('settings-panel');
            const notificationPanel = document.getElementById('notification-panel');

            if (!settingsIcon || !settingsPanel) return;

            settingsIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                settingsIcon.classList.toggle('rotated');
                settingsPanel.classList.toggle('active');

                if (notificationPanel && notificationPanel.classList.contains('active')) {
                    notificationPanel.classList.remove('active');
                    const notificationIcon = document.getElementById('notification-icon');
                    if (notificationIcon) {
                        notificationIcon.classList.remove('pulsing');
                    }
                }

                const clickToggle = document.getElementById('click-toggle');
                const clickSound = document.getElementById('clickSound');
                if (clickToggle && clickToggle.textContent === 'ON' && clickSound) {
                    clickSound.currentTime = 0;
                    clickSound.play().catch(e => console.log('Click sound failed'));
                }
            });

            document.addEventListener('click', function(e) {
                if (!settingsPanel.contains(e.target) && e.target !== settingsIcon) {
                    settingsIcon.classList.remove('rotated');
                    settingsPanel.classList.remove('active');
                }
            });

            settingsPanel.addEventListener('click', function(e) {
                e.stopPropagation();
            });

            const crtToggle = document.getElementById('crt-toggle');
            const humToggle = document.getElementById('hum-toggle');
            const clickToggle = document.getElementById('click-toggle');
            const humVolume = document.getElementById('hum-volume');
            const clickVolume = document.getElementById('click-volume');
            const humVolumeValue = document.getElementById('hum-volume-value');
            const clickVolumeValue = document.getElementById('click-volume-value');

            const humSound = document.getElementById('humSound');
            const clickSound = document.getElementById('clickSound');

            let soundsInitialized = false;

            function startSounds() {
                if (!soundsInitialized) {
                    if (humToggle && humToggle.textContent === 'ON') {
                        if (humSound) {
                            humSound.volume = 0.03;
                            humSound.play().catch(e => console.log('Hum sound failed'));
                        }
                    }
                    soundsInitialized = true;
                }
            }

            function initSounds() {
                startSounds();

                document.removeEventListener('click', initSounds);
                document.removeEventListener('keydown', initSounds);
            }

            document.addEventListener('click', initSounds);
            document.addEventListener('keydown', initSounds);

            if (crtToggle) {
                crtToggle.addEventListener('click', function(e) {
                    e.stopPropagation();

                    const body = document.body;
                    const crtEnabled = !body.classList.contains('crt-disabled');

                    if (crtEnabled) {
                        body.classList.add('crt-disabled');
                        crtToggle.textContent = 'OFF';
                        crtToggle.classList.add('active');
                    } else {
                        body.classList.remove('crt-disabled');
                        crtToggle.textContent = 'ON';
                        crtToggle.classList.remove('active');
                    }

                    if (clickToggle && clickToggle.textContent === 'ON' && soundsInitialized && clickSound) {
                        clickSound.currentTime = 0;
                        clickSound.volume = 0.6;
                        clickSound.play().catch(e => console.log('Click sound failed'));
                    }
                });
            }

            if (humToggle) {
                humToggle.addEventListener('click', function(e) {
                    e.stopPropagation();

                    const humEnabled = humToggle.textContent === 'ON';

                    if (humEnabled) {
                        humToggle.textContent = 'OFF';
                        humToggle.classList.add('active');
                        if (humSound) humSound.pause();
                    } else {
                        humToggle.textContent = 'ON';
                        humToggle.classList.remove('active');
                        if (soundsInitialized && humSound) humSound.play();
                    }

                    if (clickToggle && clickToggle.textContent === 'ON' && soundsInitialized && clickSound) {
                        clickSound.currentTime = 0;
                        clickSound.play().catch(e => console.log('Click sound failed'));
                    }
                });
            }

            if (clickToggle) {
                clickToggle.addEventListener('click', function(e) {
                    e.stopPropagation();

                    const clickEnabled = clickToggle.textContent === 'ON';

                    if (clickEnabled) {
                        clickToggle.textContent = 'OFF';
                        clickToggle.classList.add('active');
                    } else {
                        clickToggle.textContent = 'ON';
                        clickToggle.classList.remove('active');
                    }

                    if (clickToggle.textContent === 'ON' && soundsInitialized && clickSound) {
                        clickSound.currentTime = 0;
                        clickSound.play().catch(e => console.log('Click sound failed'));
                    }
                });
            }

            if (humVolume && humVolumeValue && humSound) {
                humVolume.addEventListener('input', function() {
                    const volume = this.value / 100;
                    humSound.volume = volume;
                    humVolumeValue.textContent = this.value + '%';
                });
            }

            if (clickVolume && clickVolumeValue && clickSound) {
                clickVolume.addEventListener('input', function() {
                    const volume = this.value / 100;
                    clickSound.volume = 0.1;
                    clickVolumeValue.textContent = this.value + '%';
                });
            }

            const clickableElements = document.querySelectorAll(
                '.human-predator-item, .worker-item, .entity-item, .folder-header, .staff-header, .entity-panel-header, .modal-image, .close-modal, .close-image-modal, .settings-btn, .volume-slider, .notification-icon'
            );

            clickableElements.forEach(element => {
                element.addEventListener('click', function() {
                    if (clickToggle && clickToggle.textContent === 'ON' && soundsInitialized && clickSound) {
                        clickSound.currentTime = 0;
                        clickSound.play().catch(e => console.log('Click sound failed'));
                    }
                });
            });
        }

        function setupOriginModals() {
            const humanPredatorItems = document.querySelectorAll('.human-predator-item');
            const modal = document.getElementById('origin-modal');
            const hpExperimentModal = document.getElementById('hpexperiment-modal');
            const ht05Modal = document.getElementById('ht05-modal');
            const closeModals = document.querySelectorAll('.close-modal');
            const modalName = document.getElementById('modal-origin-name');
            const modalDetails = document.getElementById('modal-details');
            const paranormalDoc = document.querySelector('.human-predator-item[data-origin="paranormal-doc"]');
            const paranormalModal = document.getElementById('paranormal-modal');
            const closeParanormalModal = paranormalModal ? paranormalModal.querySelector('.close-modal') : null;


if (paranormalDoc && paranormalModal) {
    paranormalDoc.addEventListener('click', () => {
        paranormalModal.style.display = 'flex';
    });
}

if (closeParanormalModal) {
    closeParanormalModal.addEventListener('click', () => {
        paranormalModal.style.display = 'none';
    });
}

if (paranormalModal) {
    window.addEventListener('click', (e) => {
        if (e.target === paranormalModal) {
            paranormalModal.style.display = 'none';
        }
    });
}



 // Add video document click handler
    document.querySelectorAll('[data-origin="paranormal-video"]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Play click sound if enabled
            const clickToggle = document.getElementById('click-toggle');
            const clickSound = document.getElementById('clickSound');
            if (clickToggle && clickToggle.textContent === 'ON' && clickSound) {
                clickSound.currentTime = 0;
                clickSound.play().catch(e => console.log('Click sound failed'));
            }
            
            // Show the video modal
            const videoModal = document.getElementById('paranormal-video-modal');
            if (videoModal) {
                videoModal.style.display = 'flex';
                
                // Pause any playing videos when modal closes
                const closeBtn = videoModal.querySelector('.close-modal');
                if (closeBtn) {
                    closeBtn.onclick = function() {
                        const videoPlayer = document.getElementById('paranormal-video-player');
                        if (videoPlayer) {
                            videoPlayer.pause();
                            videoPlayer.currentTime = 0;
                        }
                        videoModal.style.display = 'none';
                    };
                }
            }
        });
    });

  document.querySelectorAll('.human-predator-item[data-origin="paranormal-document"]').forEach(item => {
        item.addEventListener('click', function() {
            const modal = document.getElementById('paranormal-document-modal');
            if (modal) {
                modal.style.display = 'flex';
                
                // Play click sound if enabled
                const clickToggle = document.getElementById('click-toggle');
                const clickSound = document.getElementById('clickSound');
                if (clickToggle && clickToggle.textContent === 'ON' && clickSound) {
                    clickSound.currentTime = 0;
                    clickSound.play().catch(e => console.log('Click sound failed'));
                }
            }
        });
    });
            const originData = {
                humanpredators: {
                    name: "WILD HUMANS",
                    details: {
                        "Species Classification": "Homo Sapiens Ferus",
                        "Max Ages (Female)": "125-162 yrs",
                        "Max Ages (Male)": "109-139 yrs",
                        "Average Height (Female)": "1.9-2.4+ meters",
                        "Average Height (Male)": "2.4-2.6+ meters",
                        "Average Weight (Female)": "175-243+ kg",
                        "Average Weight (Male)": "197-250+ kg",
                        "Skeletal Weight (female)": "35-55+ kg",
                        "Skeletal Weight (Male)": "45-63+ kg",
                        "Muscle Mass (Female)": "55-70+ kg",
                        "Muscle Mass (Male)": "85-100+ kg",
                        "Body Fat Percentage (Female)": "30-40%",
                        "Body Fat Percentage (Male)": "15-25%",
                        "Skull Weight": "12.5-15 kg",
                        "Hormone Levels (Female)": "TS: 3.5–5.5 ng/mL | ES:480–720 pg/mL",
                        "Hormone Levels (Male)": "TS: 1000-2400+ ng/mL | ES: 2.9-4.6 pg/mL",
                        "Intelligence Type": "Survival",
                        "Social Structure": "Big-tribal, (male-led groups)",
                        "Primary Habitats": "Boreal forests, Polar tundra, Arid plateaus (So far).",
                        "Max Weight Lifting (Female)": "315-975+ kg",
                        "Max Weight Lifting (Male)": "535-1500+ kg",
                        "Population Distribution": "50% cold regions, 40% forests, 10% deserts (So far).",
                        "Ancient SPC Name": "Azodrius",
                        "Discovered Number": "(202 Females, 189 Males) (So far).",
                        "Discovered Races": "(19 Desert, 121 Forest, 251 Snowy) (So far).",
                        "Information": "The rest of the info are in the photo slides.",
                        "Addition": "Subj(z) Doc: /subjz_doc",
                        "Status": "Still On Research."
                    }
                }
            };

            if (!humanPredatorItems.length) {
                console.warn('No human-predator items found');
                return;
            }

            humanPredatorItems.forEach(item => {
                item.addEventListener('click', function() {
                    const origin = this.getAttribute('data-origin');
                    console.log('Clicked origin:', origin);

                    if (origin === 'hpexperiment') {
                        showHpExperimentWarning();
                    } else if (origin === 'ht05') {

                        if (ht05Modal) {
                            ht05Modal.style.display = 'flex';
                        } else {
                            console.error('HT05 modal not found');
                        }

 } else if (origin === 'mark-anderson') {
            // NEW: Handle Mark Anderson modal
            // Add this to your existing Mark Anderson modal setup
const markAndersonModal = document.getElementById('mark-anderson-modal');
if (markAndersonModal) {
    // Setup close when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === markAndersonModal) {
            markAndersonModal.style.display = 'none';
            
            // If archive modal is open in background, restore its z-index
            const archiveModal = document.getElementById('archive-modal');
            if (archiveModal && archiveModal.style.display === 'flex') {
                archiveModal.style.zIndex = '10050';
            }
        }
    });
}

                    } else {

                        const data = originData[origin];
                        if (data && modal && modalName && modalDetails) {
                            modalName.textContent = data.name;

                            modalDetails.innerHTML = '';

                            for (const [key, value] of Object.entries(data.details)) {
                                const detailItem = document.createElement('div');
                                detailItem.classList.add('detail-item');

                                const detailLabel = document.createElement('div');
                                detailLabel.classList.add('detail-label');
                                detailLabel.textContent = key;

                                const detailValue = document.createElement('div');
                                detailValue.textContent = value;

                                detailItem.appendChild(detailLabel);
                                detailItem.appendChild(detailValue);
                                modalDetails.appendChild(detailItem);

                                
                            }

                            modal.style.display = 'flex';

                            
                        }

                        
                    }
                });
            });

            if (closeModals.length > 0) {
    closeModals.forEach(closeModal => {
        closeModal.addEventListener('click', function() {
            const parentModal = this.closest('.modal');
            if (parentModal) {
                parentModal.style.display = 'none';
            }
        });
    });
}

            window.addEventListener('click', (e) => {
                if (modal && e.target === modal) {
                    modal.style.display = 'none';
                }
                if (hpExperimentModal && e.target === hpExperimentModal) {
                    hpExperimentModal.style.display = 'none';
                }
                if (ht05Modal && e.target === ht05Modal) {
                    ht05Modal.style.display = 'none';
                }
                  const markAndersonModal = document.getElementById('mark-anderson-modal');
    if (markAndersonModal && e.target === markAndersonModal) {
        markAndersonModal.style.display = 'none';
    }
            });
        }

        function setupImageModal() {
            const imageModal = document.getElementById('image-modal');
            const expandedImage = document.getElementById('expanded-image');
            const imageCaption = document.getElementById('image-caption');
            const closeImageModal = document.querySelector('.close-image-modal');
            const modalImages = document.querySelectorAll('.modal-image');

            if (!imageModal || !expandedImage || !imageCaption || !closeImageModal) return;

            modalImages.forEach(image => {
                image.addEventListener('click', () => {
                    expandedImage.src = image.src;
                    imageCaption.textContent = image.getAttribute('data-caption') || 'Research Image';
                    imageModal.style.display = 'flex';
                });
            });

            closeImageModal.addEventListener('click', () => {
                imageModal.style.display = 'none';
            });

            window.addEventListener('click', (e) => {
                if (e.target === imageModal) {
                    imageModal.style.display = 'none';
                }
            });
        }

       function initializeTerminal() {
    const terminal = document.getElementById('smol-terminal');
    const terminalInput = document.getElementById('smol-terminal-input');
    const terminalOutput = document.getElementById('smol-terminal-output');
    const terminalClose = document.getElementById('smol-terminal-close');

    if (!terminal || !terminalInput || !terminalOutput) {
        console.log('Terminal elements not found');
        return;
    }
    
    if (window.innerWidth > 768) {
        setTimeout(() => {
            terminal.classList.add('active');
            setTimeout(() => {
                terminalInput.focus();
            }, 100);
        }, 3000);
    }

    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            this.value = '';

            addOutputLine('> ' + command, 'command');

            if (command === '/help') {
                showHelp();
            } else if (command === '/clear') {
                clearTerminal();
            } else if (command === '/close') {
                terminal.classList.remove('active');
            } else if (command === '/known_e') {  
                showKnownEntitiesPanel();
                addOutputLine('Opening Known Entities...', 'success');
                setTimeout(() => {
                    showKnownEntitiesPanel();
                }, 500);
            } else if (command === '/subjz_doc') {
                showSubjectDocument();
                addOutputLine('Loading Subject Document...', 'success');
            } else if (command === '/acsc_doc') {
                showAcscDocument();
                addOutputLine('Loading Ashen Communion Document...', 'success');
            } else if (command.startsWith('/')) {
                const socialCommand = command.substring(1);
                if (socialLinks[socialCommand]) {
                    redirectToSocial(socialLinks[socialCommand]);
                } else {
                    addOutputLine('Unknown command: ' + command, 'error');
                }
            } else if (command) {
                addOutputLine('Unknown command: ' + command, 'error');
            }

            setTimeout(() => {
                terminalInput.focus();
            }, 50);
        }
    });

    if (terminalClose) {
        terminalClose.addEventListener('click', function() {
            terminal.classList.remove('active');
        });
    }

    function showHelp() {
        const helpText = [
            "Available Commands:",
            "────────────────────",
            "My Accounts = /accounts",
            "Archive Folder= /archive",
            "Known Entities = /known_e",
            "Clear = /clear",
            "Close = /close"
        ];

        const currentOutput = terminalOutput.innerHTML;
        terminalOutput.innerHTML = '';

        const commandLine = document.createElement('div');
        commandLine.className = 'smol-output-line';
        commandLine.innerHTML = `<span class="smol-prompt">></span><span class="smol-text" style="color: var(--main-glow)"> /help</span>`;
        terminalOutput.appendChild(commandLine);

        typeText(helpText, 0, 50);
    }

    function typeText(lines, lineIndex, speed) {
        if (lineIndex >= lines.length) return;

        const line = lines[lineIndex];
        const lineElement = document.createElement('div');
        lineElement.className = 'smol-output-line';

        if (lineIndex === 0) {
            lineElement.innerHTML = `<span class="smol-prompt">></span><span class="smol-text" style="color: var(--main-glow)"></span>`;
        } else if (line.includes('─')) {
            lineElement.innerHTML = `<span class="smol-prompt"> </span><span class="smol-text" style="color: var(--text-secondary)"></span>`;
        } else {
            lineElement.innerHTML = `<span class="smol-prompt"> </span><span class="smol-text" style="color: var(--text-primary)"></span>`;
        }

        terminalOutput.appendChild(lineElement);
        const textElement = lineElement.querySelector('.smol-text');

        let charIndex = 0;

        function typeChar() {
            if (charIndex < line.length) {
                textElement.textContent += line.charAt(charIndex);
                charIndex++;
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                setTimeout(typeChar, speed);
            } else {
                setTimeout(() => {
                    typeText(lines, lineIndex + 1, speed);
                }, 100);
            }
        }

        typeChar();
    }

    function showSubjectDocument() {
    // Set timeout for 1 second delay
    setTimeout(function() {
        // Check if modal already exists
        let modal = document.getElementById('subject-doc-modal');
        
        if (!modal) {
            // Create the modal HTML with updated class names
            const modalHTML = `
                <div class="image-modal" id="subject-doc-modal">
                    <div class="image-modal-content">
                        <span class="close-image-modal">×</span>
                        <img src="https://files.catbox.moe/dzhn4s.png" alt="Subject Document" class="image-modal-img">
                        <div class="image-modal-caption">Subject (Z) DCF-Document</div>
                    </div>
                </div>
            `;
            
            // Create modal if it doesn't exist
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = modalHTML;
            modal = tempDiv.firstElementChild;
            document.body.appendChild(modal);
            
            // Add event listener for close button
            const closeBtn = modal.querySelector('.close-image-modal');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    modal.style.display = 'none';
                });
                
                // Add hover effect to close button (CSS will handle most of this)
                closeBtn.addEventListener('mouseover', function() {
                    this.style.color = 'var(--error-glow)';
                    this.style.transform = 'scale(1.2)';
                });
                
                closeBtn.addEventListener('mouseout', function() {
                    this.style.color = 'var(--main-glow)';
                    this.style.transform = 'scale(1)';
                });
            }
            
            // Close when clicking outside the image
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
            
        }
        
        // Show the modal
        modal.style.display = 'flex';
        
        // Close the terminal if it's open
        const smolTerminal = document.getElementById('smol-terminal');
        if (smolTerminal && smolTerminal.classList.contains('active')) {
            smolTerminal.classList.remove('active');
        }
    }, 1000); // 1 second delay
}

    function showAcscDocument() {
    // Set timeout for 1 second delay
    setTimeout(function() {
        // Check if modal already exists
        let modal = document.getElementById('acsc-doc-modal');
        
        if (!modal) {
            // Create the modal HTML with updated class names
            const modalHTML = `
                <div class="image-modal" id="acsc-doc-modal">
                    <div class="image-modal-content">
                        <span class="close-image-modal">×</span>
                        <img src="https://files.catbox.moe/jv9cqy.jpg" alt="Acsc Document" class="image-modal-img">
                        <div class="image-modal-caption">Ashen Communion Spiritual Cult DCF-Document</div>
                    </div>
                </div>
            `;
            
            // Create modal if it doesn't exist
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = modalHTML;
            modal = tempDiv.firstElementChild;
            document.body.appendChild(modal);
            
            // Add event listener for close button
            const closeBtn = modal.querySelector('.close-image-modal');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    modal.style.display = 'none';
                });
                
                // Add hover effect to close button (CSS will handle most of this)
                closeBtn.addEventListener('mouseover', function() {
                    this.style.color = 'var(--error-glow)';
                    this.style.transform = 'scale(1.2)';
                });
                
                closeBtn.addEventListener('mouseout', function() {
                    this.style.color = 'var(--main-glow)';
                    this.style.transform = 'scale(1)';
                });
            }
            
            // Close when clicking outside the image
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
            
        }
        
        // Show the modal
        modal.style.display = 'flex';
        
        // Close the terminal if it's open
        const smolTerminal = document.getElementById('smol-terminal');
        if (smolTerminal && smolTerminal.classList.contains('active')) {
            smolTerminal.classList.remove('active');
        }
    }, 1000); // 1 second delay
}
// To trigger the modal automatically after page load:


function showKnownEntitiesPanel() {
    // Check if panel already exists
    let panel = document.getElementById('known-entities-panel');
    
    if (!panel) {
        // Create the panel HTML (exactly like archive modal style)
        const panelHTML = `
<div class="kn-modal kn-modal-main" id="known-entities-panel">
    <div class="kn-modal-content">
        <span class="kn-modal-close">×</span>
        <h2 class="kn-modal-title">KNOWN ENTITIES (S1)</h2>
        <p class="kn-modal-subtitle">Known Entities within M.R.I.S. database</p>
        
        <div class="kn-modal-grid">
            <!-- Entity 1: The Unbidden Housemate -->
            <div class="kn-modal-card" data-status="documented">
                <div class="kn-modal-avatar">
                    <img src="https://files.catbox.moe/g4bcja.jpg" alt="The Unbidden Housemate" loading="lazy">
                </div>
                <h3 class="kn-modal-name">THE UNBIDDEN HOUSEMATE</h3>
                <p class="kn-modal-description">
                    You live alone beside a forest everyone fears, dismissing the rumors as nothing more than stories. When food goes missing, smells spread, and footsteps echo through your house at night, you realize something is sharing your home. You decided to check who is sharing the house with you.
                </p>
                <div class="kn-modal-actions">
                    <a href="https://janitorai.com/characters/3d3e4758-010a-4331-ac1d-c7dd5524e1fb_character-the-unbidden-housemate" target="_blank" class="kn-modal-link">
                        <span class="kn-modal-link-text">CLICK TO REDIRECT</span>
                    </a>
                    <div class="kn-modal-badge">
                        <span class="kn-modal-badge-label">ID:</span>
                        <span class="kn-modal-badge-value">WILD HUMAN</span>
                        </div>
                        <div class="kn-modal-badge">
                        <span class="kn-modal-badge-label">CLASS:</span>
                        <span class="kn-modal-badge-value">NATRUAL ENTITIES</span>
                    </div>
                </div>
            </div>
            
            <!-- Entity 2: The Experiment -->
            <div class="kn-modal-card" data-status="contained">
                <div class="kn-modal-avatar">
                    <img src="https://files.catbox.moe/ti58ni.jpg" alt="The Experiment" loading="lazy">
                </div>
                <h3 class="kn-modal-name">THE ABANDONED EXPERIMENT</h3>
                <p class="kn-modal-description">
                    You went into the forest confident you’d find nothing, just like always. Under an abandoned cabin, you found a powered bunker, failed experiments, and records of something that never stopped growing. When you opened the locked door, you saw something that you're not supposed to see.
                </p>
                <div class="kn-modal-actions">
                    <a href="https://janitorai.com/characters/77d08743-488b-4c09-b115-b3ff3c9a559f_character-the-abandoned-experiment-ht-05" target="_blank" class="kn-modal-link">
                        <span class="kn-modal-link-text">CLICK TO REDIRECT</span>
                    </a>
                    <div class="kn-modal-badge">
                        <span class="kn-modal-badge-label">ID:</span>
                        <span class="kn-modal-badge-value">HT_05</span>
                        </div>
                        <div class="kn-modal-badge">
                        <span class="kn-modal-badge-label">CLASS:</span>
                        <span class="kn-modal-badge-value">EXPERIMENTAL CREATIONS</span>
                    </div>
                </div>
            </div>
            
            <!-- Entity 3: The Stalker -->
            <div class="kn-modal-card" data-status="active">
                <div class="kn-modal-avatar">
                    <img src="https://files.catbox.moe/e6dvyx.jpg" alt="The Stalker" loading="lazy">
                </div>
                <h3 class="kn-modal-name">THE HAUNTING STALKER</h3>
                <p class="kn-modal-description">
                    You agree to watch Arthur’s isolated cabin in the deep woods, trusting him despite his unsettling warning to ignore whatever you see. Strange knocks, carved symbols, and other things that reveal that Arthur didn’t leave as you think. There is something that Arthur hides from you.
                </p>
                <div class="kn-modal-actions">
                    <a href="https://janitorai.com/characters/b62325c9-d7cf-4bf2-b8db-08e33cf9e250_character-the-haunting-stalker" target="_blank" class="kn-modal-link">
                        <span class="kn-modal-link-text">CLICK TO REDIRECT</span>
                    </a>
                    <div class="kn-modal-badge">
                        <span class="kn-modal-badge-label">ID:</span>
                        <span class="kn-modal-badge-value">VOYEUR</span>
                        </div>
                        <div class="kn-modal-badge">
                        <span class="kn-modal-badge-label">CLASS:</span>
                        <span class="kn-modal-badge-value">PARANORMAL ENTITIES</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        `;
        
        // Create panel if it doesn't exist
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = panelHTML;
        panel = tempDiv.firstElementChild;
        document.body.appendChild(panel);
        
        // Add event listeners - FIXED: Changed '.close-modal' to '.kn-modal-close'
        const closeBtn = panel.querySelector('.kn-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                panel.style.display = 'none';
            });
            
            // Add hover effect to close button
            closeBtn.addEventListener('mouseover', function() {
                this.style.color = '#ff003c';
                this.style.transform = 'scale(1.2)';
            });
            
            closeBtn.addEventListener('mouseout', function() {
                this.style.color = '#03d677';
                this.style.transform = 'scale(1)';
            });
        }
        
        // Close when clicking outside
        panel.addEventListener('click', function(e) {
            if (e.target === panel) {
                panel.style.display = 'none';
            }
        });
        
        // Add hover effects to entity cards - FIXED: Changed '.entity-card' to '.kn-modal-card'
        const entityCards = panel.querySelectorAll('.kn-modal-card');
        entityCards.forEach(card => {
            card.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(3, 214, 119, 0.3)';
                this.style.background = 'rgba(0, 40, 0, 0.6)';
            });
            
            card.addEventListener('mouseout', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
                this.style.background = 'rgba(0, 30, 0, 0.5)';
            });
            
            // Click sound for entity cards
            card.addEventListener('click', function() {
                const clickToggle = document.getElementById('click-toggle');
                const clickSound = document.getElementById('clickSound');
                if (clickToggle && clickToggle.textContent === 'ON' && clickSound) {
                    clickSound.currentTime = 0;
                    clickSound.play().catch(e => console.log('Click sound failed'));
                }
            });
        });
    }
    
    // Show the panel after 1 second delay (no animation)
    setTimeout(() => {
        panel.style.display = 'flex';
        
        // Close the terminal if it's open
        const smolTerminal = document.getElementById('smol-terminal');
        if (smolTerminal && smolTerminal.classList.contains('active')) {
            smolTerminal.classList.remove('active');
        }
    }, 1000);
}

// You can add this CSS to your existing styles or create a new style element
const style = document.createElement('style');
style.textContent = `
.kn-modal-main {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.95);
    z-index: 10050;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    font-family: 'Share Tech Mono', monospace;
}

.kn-modal-content {
    background-color: rgba(0, 15, 0, 0.95);
    border: 2px solid #00ff73;
    padding: 30px;
    width: 1000px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 0 40px rgba(0, 255, 115, 0.5);
    position: relative;
    border-radius: 8px;
}

.kn-modal-close {
    position: absolute;
    top: 15px;
    right: 20px;
    color: #00ff73;
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10051;
    line-height: 1;
    font-family: 'VT323', monospace;
}

.kn-modal-close:hover {
    color: #d60303ff;
    text-shadow: 0 0 10px rgba(0, 255, 115, 0.5);
}

.kn-modal-title {
    color: #00ff73;
    font-size: 2.2rem;
    margin-bottom: 20px;
    text-align: center;
    text-shadow: 0 0 10px rgba(0, 255, 115, 0.5);
    font-family: 'VT323', monospace;
    letter-spacing: 1px;
}

.kn-modal-subtitle {
    color: #00ff73;
    font-size: 1.2rem;
    margin-bottom: 25px;
    text-align: center;
    opacity: 0.8;
}

/* Entities Grid */
.kn-modal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

/* Entity Card */
.kn-modal-card {
    background: rgba(0, 255, 115, 0.1);
    border: 1px solid rgba(0, 255, 115, 0.3);
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.kn-modal-card:hover {
    background: rgba(0, 255, 115, 0.15);
    border-color: #00ff73;
    box-shadow: 0 5px 20px rgba(0, 255, 115, 0.2);
}

.kn-modal-avatar {
    width: 200px;
    height: 200px;
    margin: 0 auto 15px;
    border-radius: 0;
    overflow: hidden;
    border: 2px solid #00ff73;
    position: relative;
}

.kn-modal-avatar img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    transition: all 0.3s ease;
    /* Greenish filter applied by default */
    filter: sepia(0.4) grayscale(0.6) hue-rotate(60deg) saturate(1.2) blur(4px) brightness(0.5);
}

.kn-modal-card:hover .kn-modal-avatar img {
    /* Remove filter on hover to show normal colors */
    filter: none;
}

.kn-modal-name {
    color: #00ff73;
    margin-bottom: 10px;
    font-family: 'VT323', monospace;
    font-size: 1.5rem;
    min-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.kn-modal-description {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.7rem;
    line-height: 1.3;
    margin-bottom: 10px;
    flex-grow: 1;
}

/* Entity Actions Container */
.kn-modal-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 15px;
}

/* Custom Button Styling */
.kn-modal-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: rgba(0, 255, 115, 0.2);
    color: #00ff73;
    border: 1px solid #00ff73;
    padding: 12px 20px;
    border-radius: 4px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9rem;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.kn-modal-link:hover {
    background: rgba(0, 255, 115, 0.3);
    color: #ffffff;
    border-color: #00ff73;
    box-shadow: 0 0 15px rgba(0, 255, 115, 0.4);
    transform: translateY(-2px);
}

.kn-modal-link:active {
    transform: translateY(0);
    background: rgba(0, 255, 115, 0.25);
}

.kn-modal-link-icon {
    font-size: 1.1rem;
    transition: transform 0.3s ease;
}

.kn-modal-link:hover .kn-modal-link-icon {
    transform: translate(3px, -3px);
}

.kn-modal-link-text {
    font-weight: bold;
    letter-spacing: 0.5px;
}

/* ID Badge Styling */
.kn-modal-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: rgba(0, 255, 115, 0.1);
    border: 1px solid rgba(0, 255, 115, 0.3);
    padding: 6px 10px;
    border-radius: 3px;
    font-family: 'VT323', monospace;
    font-size: 0.85rem;
    letter-spacing: 0.3px;
}

.kn-modal-badge-label {
    color: rgba(0, 255, 115, 0.7);
    font-size: 0.7rem;
    text-transform: uppercase;
}

.kn-modal-badge-value {
    color: #00ff73;
    font-weight: bold;
    font-size: 0.9rem;
    text-shadow: 0 0 3px rgba(0, 255, 115, 0.5);
}

/* Database Info */
.kn-modal-info {
    margin-top: 20px;
    padding: 15px;
    background: rgba(0, 30, 0, 0.3);
    border-left: 3px solid #00ff73;
    border-radius: 4px;
}

.kn-modal-info-title {
    color: #00ff73;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 1rem;
}

.kn-modal-info-content {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.5;
    font-size: 0.9rem;
}

/* Mobile Optimizations */
@media (max-width: 768px) {
   
    .kn-modal-close {
    font-family: 'VT323', monospace;
        
    }

    .kn-modal-title {
        font-size: 1.8rem;
    }
    
    .kn-modal-subtitle {
        font-size: 1rem;
    }
    
    .kn-modal-grid {
        grid-template-columns: 1fr;
        gap: 15px;
    }
    
    .kn-modal-name {
        font-size: 1.2rem;
        text-align: center;
        margin: 0 auto;
    }
    
    .kn-modal-description {
        font-size: 0.85rem;
        text-align: center !important; 
        color: white !important;
        margin: 0 auto !important;
    }
    
    .kn-modal-link {
        padding: 14px 20px;
        font-size: 0.95rem;
    }
    
    .kn-modal-link-icon {
        font-size: 1.2rem;
    }
    
    .kn-modal-badge {
        padding: 10px 15px;
        font-size: 0.95rem;
    }
    
    .kn-modal-badge-label {
        font-size: 0.75rem;
    }
    
    .kn-modal-badge-value {
        font-size: 1rem;
    }
}

/* Small Mobile Devices */
@media (max-width: 480px) {
    .kn-modal-link {
        flex-direction: column;
        gap: 5px;
        padding: 12px 15px;
    }
    
    .kn-modal-link-icon {
        font-size: 1.3rem;
    }
    
    .kn-modal-link-text {
        font-size: 0.85rem;
    }
    
    .kn-modal-badge {
        flex-direction: column;
        gap: 4px;
        padding: 8px 10px;
    }
    
    .kn-modal-badge-label,
    .kn-modal-badge-value {
        text-align: center;
        width: 100%;
    }
}

/* Touch-friendly hover alternatives for mobile */
@media (hover: none) {
    .kn-modal-card:hover {
        transform: none;
    }
    
    .kn-modal-link:hover {
        transform: none;
    }
    
    .kn-modal-link:active {
        background: rgba(0, 255, 115, 0.3);
        transform: scale(0.98);
    }
}
`;
document.head.appendChild(style);

            function redirectToSocial(social) {
                addOutputLine(`Redirecting to ${social.name}...`, 'success');
                setTimeout(() => {
                    window.open(social.url, '_blank');
                }, 1000);
            }

            function addOutputLine(text, type = 'normal') {
                const line = document.createElement('div');
                line.className = 'smol-output-line';

                let prompt = '';
                let textColor = 'var(--text-primary)';

                switch (type) {
                    case 'command':
                        prompt = '>';
                        textColor = 'var(--main-glow)';
                        break;
                    case 'error':
                        prompt = '!';
                        textColor = 'var(--error-glow)';
                        break;
                    case 'success':
                        prompt = '✓';
                        textColor = 'var(--main-glow)';
                        break;
                    case 'info':
                        prompt = 'i';
                        textColor = 'var(--text-secondary)';
                        break;
                    default:
                        prompt = '>';
                }

                line.innerHTML = `
                    <span class="smol-prompt">${prompt}</span>
                    <span class="smol-text" style="color: ${textColor}">${text}</span>
                `;

                terminalOutput.appendChild(line);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }

            function clearTerminal() {
                terminalOutput.innerHTML = '';
                addOutputLine('Terminal cleared. Type /help for assistance', 'info');
            }

            const toggleBtn = document.createElement('div');
            toggleBtn.className = 'smol-terminal-toggle';
            toggleBtn.innerHTML = '>';
            toggleBtn.addEventListener('click', function() {
                terminal.classList.add('active');
                setTimeout(() => {
                    terminalInput.focus();
                }, 100);
            });
            document.body.appendChild(toggleBtn);

            terminal.addEventListener('click', function() {
                terminalInput.focus();
            });
        }

        function checkMobileDevice() {
            const mobileNotification = document.getElementById('mobile-notification');
            const closeButton = document.getElementById('mobile-notification-close');

            function isMobileDevice() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                    window.innerWidth <= 768;
            }

            const hasSeenMobileNotification = localStorage.getItem('mris_mobile_notification_seen');

            if (isMobileDevice() && mobileNotification && !hasSeenMobileNotification) {
                setTimeout(() => {
                    mobileNotification.classList.add('active');
                }, 1000);
            }

            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    if (mobileNotification) {

                        localStorage.setItem('mris_mobile_notification_seen', 'true');
                        mobileNotification.classList.remove('active');
                    }
                });
            }

            if (isMobileDevice() && mobileNotification && !hasSeenMobileNotification) {
                setTimeout(() => {
                    localStorage.setItem('mris_mobile_notification_seen', 'true');
                    mobileNotification.classList.remove('active');
                }, 8000);
            }
        }

        function initializeImmersiveModes() {

            const hasSeenImmersiveMode = localStorage.getItem('mris_immersive_mode_seen');

            if (hasSeenImmersiveMode) {
                return;
            }

            function isDesktop() {
                return window.innerWidth > 768 && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            }

            function requestFullscreen() {
                const docElement = document.documentElement;

                if (docElement.requestFullscreen) {
                    docElement.requestFullscreen().catch(err => {
                        console.log('Fullscreen request failed:', err);
                        showFullscreenPrompt();
                    });
                } else if (docElement.mozRequestFullScreen) {
                    docElement.mozRequestFullScreen().catch(err => {
                        console.log('Fullscreen request failed:', err);
                        showFullscreenPrompt();
                    });
                } else if (docElement.webkitRequestFullscreen) {
                    docElement.webkitRequestFullscreen().catch(err => {
                        console.log('Fullscreen request failed:', err);
                        showFullscreenPrompt();
                    });
                } else if (docElement.msRequestFullscreen) {
                    docElement.msRequestFullscreen().catch(err => {
                        console.log('Fullscreen request failed:', err);
                        showFullscreenPrompt();
                    });
                } else {
                    showFullscreenPrompt();
                }
            }

            function showFullscreenPrompt() {
                const fullscreenPrompt = document.createElement('div');
                fullscreenPrompt.id = 'fullscreen-prompt';
                fullscreenPrompt.innerHTML = `
            <div class="fullscreen-prompt-content">
                <h3>IMMERSIVE MODE</h3>
                <p>For optimal experience, press F11 to enter fullscreen mode</p>
                <button id="dismiss-prompt" class="fullscreen-dismiss-btn">ACKNOWLEDGE</button>
            </div>
        `;
                document.body.appendChild(fullscreenPrompt);

                document.getElementById('dismiss-prompt').addEventListener('click', function() {

                    localStorage.setItem('mris_immersive_mode_seen', 'true');
                    fullscreenPrompt.remove();
                });

                setTimeout(() => {
                    if (fullscreenPrompt.parentNode) {
                        localStorage.setItem('mris_immersive_mode_seen', 'true');
                        fullscreenPrompt.remove();
                    }
                }, 10000);
            }

            function isFullscreen() {
                return !!(document.fullscreenElement ||
                    document.mozFullScreenElement ||
                    document.webkitFullscreenElement ||
                    document.msFullscreenElement);
            }

            function isMobileDevice() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
            }

            function showMobilePrompt() {
                const mobileNotification = document.getElementById('mobile-notification');
                if (mobileNotification) {
                    mobileNotification.classList.add('active');

                    const mobileDismissBtn = document.getElementById('mobile-notification-close');
                    if (mobileDismissBtn) {

                        mobileDismissBtn.replaceWith(mobileDismissBtn.cloneNode(true));
                        const newDismissBtn = document.getElementById('mobile-notification-close');

                        newDismissBtn.addEventListener('click', function() {

                            localStorage.setItem('mris_immersive_mode_seen', 'true');
                            mobileNotification.classList.remove('active');
                        });
                    }

                    setTimeout(() => {
                        localStorage.setItem('mris_immersive_mode_seen', 'true');
                        mobileNotification.classList.remove('active');
                    }, 10000);
                }
            }

            if (isDesktop() && !isFullscreen()) {

                setTimeout(() => {
                    requestFullscreen();
                }, 1000);
            } else if (isMobileDevice()) {

                setTimeout(() => {
                    showMobilePrompt();
                }, 2000);
            }

            document.addEventListener('fullscreenchange', handleFullscreenChange);
            document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.addEventListener('mozfullscreenchange', handleFullscreenChange);
            document.addEventListener('MSFullscreenChange', handleFullscreenChange);

            function handleFullscreenChange() {
                if (isFullscreen()) {
                    console.log('Entered fullscreen mode');

                    localStorage.setItem('mris_immersive_mode_seen', 'true');
                } else {
                    console.log('Exited fullscreen mode');
                }
            }

            document.addEventListener('keydown', function(e) {
                if (e.key === 'F11') {
                    e.preventDefault();
                    if (!isFullscreen()) {
                        requestFullscreen();
                    } else {
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                        } else if (document.msExitFullscreen) {
                            document.msExitFullscreen();
                        }
                    }
                }
            });
        }

        function setupMobilePanelBehavior() {

            function isMobileDevice() {
                return window.innerWidth <= 768 ||
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            }

            if (!isMobileDevice()) return;

            const settingsPanel = document.getElementById('settings-panel');
            const notificationPanel = document.getElementById('notification-panel');
            const settingsIcon = document.getElementById('settings-icon');
            const notificationIcon = document.getElementById('notification-icon');

            let scrollTimer;
            window.addEventListener('scroll', function() {
                if (settingsPanel && settingsPanel.classList.contains('active')) {
                    settingsPanel.classList.remove('active');
                    if (settingsIcon) settingsIcon.classList.remove('rotated');
                }

                if (notificationPanel && notificationPanel.classList.contains('active')) {
                    notificationPanel.classList.remove('active');
                    if (notificationIcon) notificationIcon.classList.remove('pulsing');
                }
            }, {
                passive: true
            });

            document.addEventListener('touchstart', function(e) {
                if (settingsPanel && settingsPanel.classList.contains('active') &&
                    !settingsPanel.contains(e.target) && e.target !== settingsIcon) {
                    settingsPanel.classList.remove('active');
                    if (settingsIcon) settingsIcon.classList.remove('rotated');
                }

                if (notificationPanel && notificationPanel.classList.contains('active') &&
                    !notificationPanel.contains(e.target) && e.target !== notificationIcon) {
                    notificationPanel.classList.remove('active');
                    if (notificationIcon) notificationIcon.classList.remove('pulsing');
                }
            });
        }

        document.addEventListener('DOMContentLoaded', function() {

            setupMobilePanelBehavior();
        });

        function setupEnhancedMobileExperience() {
            const isMobile = window.innerWidth <= 768 ||
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (!isMobile) return;

            setupEnhancedTouchInteractions();

            setupMobileAnimations();

            setupMobileNavigation();

            setupMobileModals();

            setupMobilePerformance();
        }

        function setupEnhancedTouchInteractions() {

            const interactiveElements = document.querySelectorAll(
                '.human-predator-item, .worker-item, .entity-item, .folder-header, ' +
                '.staff-header, .entity-panel-header, .lab-icon-item, .settings-btn, ' +
                '.settings-icon, .notification-icon'
            );

            interactiveElements.forEach(element => {
                element.style.cursor = 'pointer';
                element.style.webkitTapHighlightColor = 'rgba(0, 255, 65, 0.3)';

                element.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.98)';
                    this.style.transition = 'transform 0.1s ease';
                });

                element.addEventListener('touchend', function() {
                    this.style.transform = 'scale(1)';
                });
            });
        }

        function setupMobileAnimations() {

            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

            if (reducedMotion.matches) {
                document.body.classList.add('reduced-motion');
            }

            document.documentElement.style.scrollBehavior = 'smooth';

            const panels = document.querySelectorAll('.staff-content, .entity-panel-content, .folder-content');
            panels.forEach(panel => {
                panel.style.transition = 'max-height 0.4s ease, padding 0.4s ease';
            });
        }

        function setupMobileNavigation() {

            let startX = 0;
            let currentModal = null;

            document.addEventListener('touchstart', function(e) {
                const modal = e.target.closest('.modal');
                if (modal) {
                    startX = e.touches[0].clientX;
                    currentModal = modal;
                }
            });

            document.addEventListener('touchmove', function(e) {
                if (!currentModal) return;

                const currentX = e.touches[0].clientX;
                const diffX = currentX - startX;

                if (diffX > 100) {
                    currentModal.style.display = 'none';
                    currentModal = null;
                }
            });

            document.addEventListener('touchend', function(e) {
                const modals = document.querySelectorAll('.modal');
                modals.forEach(modal => {
                    if (modal.style.display === 'flex' && !modal.contains(e.target)) {
                        modal.style.display = 'none';
                    }
                });
            });
        }

        function setupMobileModals() {

            const modals = document.querySelectorAll('.modal');

            modals.forEach(modal => {

                const closeBtn = modal.querySelector('.close-modal');
                if (closeBtn) {
                    closeBtn.style.padding = '15px';
                    closeBtn.style.fontSize = '2rem';
                    closeBtn.style.minWidth = '50px';
                    closeBtn.style.minHeight = '50px';
                    closeBtn.style.display = 'flex';
                    closeBtn.style.alignItems = 'center';
                    closeBtn.style.justifyContent = 'center';
                }

                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.overflowY = 'auto';
                    modalContent.style.WebkitOverflowScrolling = 'touch';
                }
            });
        }

        function fixMobilePanels() {
            if (window.innerWidth <= 768) {
                const settingsPanel = document.getElementById('settings-panel');
                const notificationPanel = document.getElementById('notification-panel');

                if (settingsPanel) {
                    settingsPanel.style.top = '';
                    settingsPanel.style.right = '';
                    settingsPanel.style.bottom = '';
                    settingsPanel.style.left = '';
                    settingsPanel.style.transform = '';
                    settingsPanel.style.margin = '';
                }

                if (notificationPanel) {
                    notificationPanel.style.top = '';
                    notificationPanel.style.right = '';
                    notificationPanel.style.bottom = '';
                    notificationPanel.style.left = '';
                    notificationPanel.style.transform = '';
                    notificationPanel.style.margin = '';
                }
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            fixMobilePanels();

            const settingsIcon = document.getElementById('settings-icon');
            const notificationIcon = document.getElementById('notification-icon');

            if (settingsIcon) {
                settingsIcon.addEventListener('click', function() {
                    setTimeout(fixMobilePanels, 10);
                });
            }

            if (notificationIcon) {
                notificationIcon.addEventListener('click', function() {
                    setTimeout(fixMobilePanels, 10);
                });
            }
        });

        function setupSettingsClose() {
            const settingsClose = document.getElementById('settings-close');
            const settingsPanel = document.getElementById('settings-panel');
            const settingsIcon = document.getElementById('settings-icon');

            if (settingsClose && settingsPanel && settingsIcon) {
                settingsClose.addEventListener('click', function(e) {
                    e.stopPropagation();
                    settingsPanel.classList.remove('active');
                    settingsIcon.classList.remove('rotated');

                    const clickToggle = document.getElementById('click-toggle');
                    const clickSound = document.getElementById('clickSound');
                    if (clickToggle && clickToggle.textContent === 'ON' && clickSound) {
                        clickSound.currentTime = 0;
                        clickSound.play().catch(e => console.log('Click sound failed'));
                    }
                });
            }
        }

        function showHpExperimentWarning() {

            setTimeout(() => {

                const warningSound = new Audio('https://files.catbox.moe/e5vcgy.mp3');
                warningSound.volume = 1;

                const overlay = document.createElement('div');
                overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9998;
        `;

                const warning = document.createElement('div');
                warning.id = 'security-warning';
                warning.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 60, 0.95);
            color: white;
            padding: 20px;
            border: 2px solid #ff003c;
            z-index: 9999;
            font-family: 'VT323', monospace;
            text-align: center;
            min-width: 300px;
            max-width: 90%;
        `;

                warning.innerHTML = `
            <img src="https://files.catbox.moe/ef47pv.png" alt="Warning" class="warning-icon" style="width: 50px; height: 50px; margin-bottom: 10px;">
            <div style="font-size: 1.3rem; margin-bottom: 10px; font-weight: bold;">WARNING!</div>
            <div style="margin-bottom: 15px; font-size: 1rem;">
                THE DOCUMENT CONTAINS GORE AND BLOODY UNSETTLING IMAGES AND CONTENT.<br>
                PROCEED AT YOUR OWN RISK.
            </div>
            <button class="proceed-btn" style="background: #ff003c; color: white; border: 1px solid #ff3366; padding: 10px 20px; font-family: 'VT323'; font-size: 1.1rem; cursor: pointer;">
                PROCEED ANYWAY
            </button>
        `;

                document.body.appendChild(overlay);
                document.body.appendChild(warning);

                warningSound.play().catch(e => {
                    console.log('Warning sound play failed:', e);
                });

                const proceedBtn = warning.querySelector('.proceed-btn');
                proceedBtn.addEventListener('click', function() {
                    document.body.removeChild(overlay);
                    document.body.removeChild(warning);
                    const hpExperimentModal = document.getElementById('hpexperiment-modal');
                    if (hpExperimentModal) {
                        hpExperimentModal.style.display = 'flex';
                    }
                });

                overlay.addEventListener('click', function() {
                    document.body.removeChild(overlay);
                    document.body.removeChild(warning);
                });

            }, 100);
        }

        function modifySettingsForMobile() {
            if (window.innerWidth <= 768) {
                const settingsPanel = document.getElementById('settings-panel');
                if (!settingsPanel) return;

                if (settingsPanel.getAttribute('data-mobile-modified') !== 'true') {

                    const graphicsSection = settingsPanel.querySelector('.settings-section:first-child');
                    if (graphicsSection) {

                        graphicsSection.innerHTML = `
                    <div class="settings-section-title">VISUAL EFFECTS</div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.4; padding: 10px; background: rgba(0, 30, 0, 0.3); border: 1px solid var(--border-glow); text-align: center; margin-bottom: 15px;">
                        Visual effects are turned off by default. If you want to add the visual effects you can switch to desktop mode for better experience.
                    </div>
                `;

                        settingsPanel.setAttribute('data-mobile-modified', 'true');
                    }
                }
            }
        }

        function restoreSettingsForDesktop() {
            if (window.innerWidth > 768) {
                const settingsPanel = document.getElementById('settings-panel');
                if (!settingsPanel) return;

                if (settingsPanel.getAttribute('data-mobile-modified') === 'true') {

                    location.reload();
                }
            }
        }

        document.addEventListener('DOMContentLoaded', function() {

            modifySettingsForMobile();

            window.addEventListener('resize', function() {
                modifySettingsForMobile();
                restoreSettingsForDesktop();
            });
        });

        function initializeImmersiveModesOnce() {
            const fullscreenPrompt = document.getElementById('fullscreen-prompt');
            const mobileNotification = document.getElementById('mobile-notification');

            const hasSeenImmersiveMode = localStorage.getItem('mris_immersive_mode_seen');

            console.log('Immersive mode check:', {
                hasSeenImmersiveMode,
                fullscreenPrompt,
                mobileNotification
            });

            if (!hasSeenImmersiveMode) {
                const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

                console.log('Showing immersive mode for first time, isMobile:', isMobile);

                if (isMobile && mobileNotification) {
                    mobileNotification.classList.add('active');
                } else if (!isMobile && fullscreenPrompt) {
                    fullscreenPrompt.style.display = 'flex';
                }

                const dismissBtn = document.querySelector('.fullscreen-dismiss-btn');
                const mobileDismissBtn = document.getElementById('mobile-notification-close');

                function markImmersiveModeSeen() {
                    console.log('Marking immersive mode as seen');
                    localStorage.setItem('mris_immersive_mode_seen', 'true');
                    if (fullscreenPrompt) fullscreenPrompt.style.display = 'none';
                    if (mobileNotification) mobileNotification.classList.remove('active');
                }

                if (dismissBtn) {
                    dismissBtn.addEventListener('click', markImmersiveModeSeen);
                }

                if (mobileDismissBtn) {
                    mobileDismissBtn.addEventListener('click', markImmersiveModeSeen);
                }

            } else {

                console.log('User has seen immersive mode before, hiding both');
                if (fullscreenPrompt) fullscreenPrompt.style.display = 'none';
                if (mobileNotification) mobileNotification.classList.remove('active');
            }
        }
        function setupDesktopQuitButton() {
    const quitButton = document.getElementById('desktop-quit-btn');
    const quitModal = document.getElementById('quit-modal');
    const quitYes = document.querySelector('.quit-yes');
    const quitNo = document.querySelector('.quit-no');

    if (!quitButton || !quitModal) return;

    quitButton.addEventListener('click', function(e) {
        e.stopPropagation();
        quitModal.style.display = 'flex';
        
        // Play click sound if enabled
        const clickToggle = document.getElementById('click-toggle');
        const clickSound = document.getElementById('clickSound');
        if (clickToggle && clickToggle.textContent === 'ON' && clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => console.log('Click sound failed'));
        }
    });

    // Close modal when clicking outside
    quitModal.addEventListener('click', function(e) {
        if (e.target === quitModal) {
            quitModal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && quitModal.style.display === 'flex') {
            quitModal.style.display = 'none';
        }
    });
}
// ============================================
// SEPARATE ARCHIVE TERMINAL SYSTEM
// Add this AFTER your existing initializeTerminal() function
// ============================================

function addArchiveStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Archive Modal Styles */
  #archive-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.95);
    z-index: 10050; /* INCREASED THIS SIGNIFICANTLY */
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
}
        .archive-modal-content {
            background-color: rgba(0, 15, 0, 0.95);
            border: 2px solid #03d677;
            padding: 25px;
            max-width: 1200px;
            width: 95%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 0 40px rgba(3, 214, 119, 0.5);
            position: relative;
            border-radius: 8px;
        }
        
        .archive-close {
            position: absolute;
            top: 15px;
            right: 20px;
            color: #03d677;
            font-size: 2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10051;
        }
        
        .archive-close:hover {
            color: #ff003c;
            transform: scale(1.2);
        }
        
        .archive-title {
            color: #03d677;
            font-size: 2.2rem;
            margin-bottom: 20px;
            text-align: center;
            text-shadow: 0 0 10px rgba(3, 214, 119, 0.5);
            font-family: 'VT323', monospace;
        }
        
        .archive-subtitle {
            color: #00ff73;
            font-size: 1.2rem;
            margin-bottom: 25px;
            text-align: center;
            opacity: 0.8;
        }
        
        .archive-folder {
            margin-bottom: 20px;
            border: 1px solid rgba(3, 214, 119, 0.3);
            background: rgba(0, 30, 0, 0.3);
        }
        
        .archive-folder-header {
            background: rgba(0, 40, 0, 0.5);
            padding: 15px 20px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid transparent;
            transition: all 0.3s ease;
        }
        
        .archive-folder-header:hover {
            background: rgba(0, 60, 0, 0.5);
        }
        
        .archive-folder-title {
            color: #03d677;
            font-size: 1.3rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .archive-folder-count {
            background: rgba(3, 214, 119, 0.2);
            color: #03d677;
            padding: 4px 12px;
            font-size: 0.9rem;
            border-radius: 3px;
            border: 1px solid rgba(3, 214, 119, 0.3);
        }
        
        .archive-folder-toggle {
            color: #03d677;
            transition: transform 0.3s ease;
        }
        
        .archive-folder-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease;
            padding: 0 20px;
        }
        
        .archive-folder-content.active {
            max-height: 500px;
            padding: 20px;
            overflow-y: auto;
        }
        
        .archive-document {
            padding: 15px;
            margin-bottom: 15px;
            background: rgba(0, 20, 0, 0.4);
            border-left: 3px solid #03d677;
            border: 1px solid rgba(3, 214, 119, 0.2);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .archive-document:hover {
            background: rgba(3, 214, 119, 0.1);
            transform: translateX(5px);
        }
        
        .archive-doc-title {
            color: #00ff73;
            font-size: 1.1rem;
            margin-bottom: 8px;
            font-weight: bold;
        }
        
        .archive-doc-info {
            color: #03d677;
            font-size: 0.85rem;
            margin-bottom: 10px;
            font-family: 'Share Tech Mono', monospace;
        }
        
        .archive-doc-preview {
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9rem;
            line-height: 1.4;
            opacity: 0.8;
        }
        
        .archive-terminal-output {
            background: rgba(0, 10, 0, 0.8);
            border: 1px solid rgba(3, 214, 119, 0.3);
            padding: 15px;
            margin-top: 20px;
            font-family: 'Share Tech Mono', monospace;
        }
        
        .archive-output-line {
            margin-bottom: 8px;
            display: flex;
            align-items: flex-start;
        }
        
        .archive-output-prefix {
            color: #03d677;
            min-width: 80px;
            font-weight: bold;
        }
        
        .archive-output-text {
            color: #00ff73;
            flex: 1;
        }

        .archive-document {
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
}

.archive-document:hover {
    background: rgba(3, 214, 119, 0.15) !important;
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(3, 214, 119, 0.2);
}

.archive-document[data-document="hte_general"] {
    border-left: 3px solid #ff003c !important;
}

.archive-document[data-document="hte_general"] .archive-doc-title {
    color: #ff003c !important;
    text-shadow: 0 0 5px rgba(255, 0, 60, 0.3);
}

.archive-document::after {
    content: '↗';
    position: absolute;
    top: 15px;
    right: 15px;
    color: #03d677;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.archive-document:hover::after {
    opacity: 1;
}

/* Make modal background non-clickable for closing */
#archive-modal {
    cursor: default; /* Prevents closing on click */
}

#archive-modal .archive-modal-content {
    cursor: auto; /* Allow clicking inside */
}

/* Accounts Modal Styles */
#accounts-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.95);
    z-index: 10050;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
}

.accounts-modal-content {
    background-color: rgba(0, 15, 0, 0.95);
    border: 2px solid #00ff73;
    padding: 30px;
   width: 1000px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 0 40px rgba(0, 255, 115, 0.5);
    position: relative;
    border-radius: 8px;
}

.accounts-close {
    position: absolute;
    top: 15px;
    right: 20px;
    color: #00ff73;
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10051;
}

.accounts-close:hover {
    color: #ff003c;
    transform: scale(1.2);
}

.accounts-title {
    color: #00ff73;
    font-size: 2rem;
    margin-bottom: 10px;
    text-align: center;
    text-shadow: 0 0 10px rgba(0, 255, 115, 0.5);
    font-family: 'VT323', monospace;
}

.accounts-subtitle {
    color: rgba(0, 255, 115, 0.7);
    font-size: 1rem;
    margin-bottom: 30px;
    text-align: center;
    opacity: 0.8;
    font-family: 'Share Tech Mono', monospace;
}

.accounts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.account-button {
    background: rgba(0, 30, 0, 0.5);
    border: 1px solid #00ff73;
    border-radius: 8px;
    padding: 20px 15px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 120px;
}

.account-button:hover {
    background: rgba(0, 255, 115, 0.1);
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 255, 115, 0.3);
    border-color: #00ff73;
}

.account-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 15px;
    filter: drop-shadow(0 0 5px rgba(0, 255, 115, 0.5));
    transition: all 0.3s ease;
}

.account-button:hover .account-icon {
    filter: drop-shadow(0 0 10px #00ff73);
    transform: scale(1.1);
}

.account-name {
    color: #00ff73;
    font-size: 1.1rem;
    margin-bottom: 5px;
    font-family: 'VT323', monospace;
    text-shadow: 0 0 5px rgba(0, 255, 115, 0.3);
}

.account-link {
    color: rgba(0, 255, 115, 0.7);
    font-size: 0.85rem;
    text-decoration: none;
    font-family: 'Share Tech Mono', monospace;
    word-break: break-all;
    max-width: 100%;
}

.account-button:hover .account-link {
    color: #00ff73;
}

.accounts-note {
    margin-top: 25px;
    padding: 15px;
    background: rgba(0, 30, 0, 0.3);
    border-left: 3px solid #00ff73;
    border-radius: 4px;
}

.accounts-note-text {
    color: rgba(0, 255, 115, 0.8);
    font-size: 0.9rem;
    text-align: center;
    font-family: 'Share Tech Mono', monospace;
    line-height: 1.4;
}

/* For small screens */
@media (max-width: 768px) {
    .accounts-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }
    
    .accounts-modal-content {
        padding: 20px;
        width: 95%;
    }
    
    .account-button {
        padding: 15px 10px;
        min-height: 110px;
    }
}

@media (max-width: 480px) {
    .accounts-grid {
        grid-template-columns: 1fr;
        gap: 12px;
    }
    
    .account-button {
        padding: 12px 8px;
        min-height: 100px;
    }
}
      .archive-photo-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.95);
            z-index: 10055;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px);
        }
        
        .archive-photo-content {
            max-width: 90%;
            max-height: 90vh;
            background: rgba(0, 15, 0, 0.95);
            border: 2px solid #03d677;
            padding: 10px;
            position: relative;
        }
        
        .archive-photo-img {
            max-width: 100%;
            max-height: 80vh;
            display: block;
        }
        
        .archive-photo-close {
            position: absolute;
            top: -15px;
            right: -15px;
            color: #03d677;
            font-size: 2rem;
            cursor: pointer;
            background: rgba(0, 15, 0, 0.9);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #03d677;
        }
        
        .archive-error-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.95);
            z-index: 10055;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px);
        }
        
        .archive-error-content {
            background-color: rgba(60, 0, 0, 0.95);
            border: 2px solid #ff003c;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 0 40px rgba(255, 0, 60, 0.5);
            border-radius: 8px;
        }
        
        .archive-error-title {
            color: #ff003c;
            font-size: 1.8rem;
            margin-bottom: 20px;
            text-shadow: 0 0 10px rgba(255, 0, 60, 0.5);
        }
        
        .archive-error-message {
            color: #ff6666;
            font-size: 1.2rem;
            margin-bottom: 30px;
            line-height: 1.5;
        }
        
        .archive-error-button {
            background: rgba(255, 0, 60, 0.2);
            color: #ff003c;
            border: 1px solid #ff003c;
            padding: 12px 30px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 4px;
        }
        
        .archive-error-button:hover {
            background: rgba(255, 0, 60, 0.3);
            transform: scale(1.05);
        }
            /* Add these mobile-specific styles to the existing archive CSS */

@media (max-width: 768px) {
    /* Archive Modal for Mobile */
    .archive-modal-content {
        width: 92% !important;
        max-width: 92% !important;
        padding: 12px !important;
        margin: 8px !important;
        max-height: 93vh !important;
        border-width: 1px !important;
    }
    
    .archive-title {
        font-size: 1.3rem !important;
        margin-bottom: 10px !important;
    }
    
    .archive-subtitle {
        font-size: 1rem !important;
        margin-bottom: 15px !important;
    }
    
    .archive-close {
        top: 10px !important;
        right: 15px !important;
        font-size: 1.8rem !important;
        width: 35px !important;
        height: 35px !important;
    }
    
    /* Folder Headers for Mobile */
    .archive-folder-header {
        padding: 12px 15px !important;
    }
    
    .archive-folder-title {
        font-size: 1.1rem !important;
        gap: 8px !important;
    }
    
    .archive-folder-count {
        padding: 3px 8px !important;
        font-size: 0.8rem !important;
    }
    
    .archive-folder-content {
        padding: 0 15px !important;
    }
    
    .archive-folder-content.active {
        padding: 15px !important;
        max-height: 400px !important;
    }
    
    /* Documents for Mobile */
    .archive-document {
        padding: 12px !important;
        margin-bottom: 10px !important;
    }
    
    .archive-doc-title {
        font-size: 1rem !important;
        margin-bottom: 6px !important;
        line-height: 1.3 !important;
    }
    
    .archive-doc-info {
        font-size: 0.8rem !important;
        margin-bottom: 8px !important;
        word-break: break-word !important;
    }
    
    .archive-doc-preview {
        font-size: 0.85rem !important;
        line-height: 1.3 !important;
    }
    
    /* Terminal Output for Mobile */
    .archive-terminal-output {
        padding: 12px !important;
        margin-top: 15px !important;
        font-size: 0.9rem !important;
    }
    
    .archive-output-line {
        margin-bottom: 6px !important;
        flex-direction: column !important;
        align-items: flex-start !important;
    }
    
    .archive-output-prefix {
        min-width: auto !important;
        margin-bottom: 3px !important;
        font-size: 0.9rem !important;
    }
    
    .archive-output-text {
        font-size: 0.9rem !important;
        word-break: break-word !important;
    }
    
    /* Information Box for Mobile */
    .archive-modal-content > div:last-child {
        margin-top: 15px !important;
        padding: 12px !important;
        font-size: 0.9rem !important;
    }
    
    /* Archive Photo Modal for Mobile */
    .archive-photo-content {
        max-width: 95% !important;
        max-height: 95vh !important;
        padding: 8px !important;
    }
    
    .archive-photo-img {
        max-height: 75vh !important;
    }
    
    .archive-photo-close {
        top: -10px !important;
        right: -10px !important;
        width: 35px !important;
        height: 35px !important;
        font-size: 1.5rem !important;
    }
    
    /* Error Modal for Mobile */
    .archive-error-content {
        width: 95% !important;
        padding: 20px !important;
    }
    
    .archive-error-title {
        font-size: 1.5rem !important;
        margin-bottom: 15px !important;
    }
    
    .archive-error-message {
        font-size: 1rem !important;
        margin-bottom: 20px !important;
    }
    
    .archive-error-button {
        padding: 10px 20px !important;
        font-size: 1rem !important;
    }
    
    /* Documents with special styling for Mobile */
    .archive-document[data-document="hte_general"] {
        border-left-width: 2px !important;
    }
    
    .archive-document[data-document="hte_general"] .archive-doc-title {
        font-size: 1rem !important;
        line-height: 1.3 !important;
    }
    
    /* HTE Images in Mobile */
    .image-slot {
        padding: 10px !important;
        margin-bottom: 10px !important;
    }
    
    .image-slot img {
        height: 120px !important;
    }
    
    /* Ensure proper scrolling on mobile */
    .archive-modal-content,
    .archive-folder-content,
    .archive-photo-content,
    .archive-error-content {
        -webkit-overflow-scrolling: touch !important;
        overflow-y: auto !important;
    }
    
    /* Better touch targets for mobile */
    .archive-document,
    .archive-folder-header,
    .archive-close,
    .archive-photo-close,
    .archive-error-button,
    .archive-document[data-document="hte_general"],
    .image-slot {
        min-height: 44px !important;
        cursor: pointer !important;
        -webkit-tap-highlight-color: rgba(3, 214, 119, 0.3) !important;
        tap-highlight-color: rgba(3, 214, 119, 0.3) !important;
    }
    
    /* Adjust hover effects for touch devices */
    .archive-document:active,
    .archive-folder-header:active,
    .archive-document[data-document="hte_general"]:active,
    .image-slot:active {
        transform: scale(0.98) !important;
        transition: transform 0.1s ease !important;
    }
}

/* Additional mobile-specific adjustments for smaller screens */
@media (max-width: 480px) {
    .archive-modal-content {
        padding: 12px !important;
        margin: 5px !important;
    }
    
    .archive-title {
        font-size: 1.4rem !important;
    }
    
    .archive-subtitle {
        font-size: 0.9rem !important;
    }
    
    .archive-folder-header {
        padding: 10px 12px !important;
    }
    
    .archive-folder-title {
        font-size: 1rem !important;
    }
    
    .archive-document {
        padding: 10px !important;
    }
    
    .archive-doc-title {
        font-size: 0.95rem !important;
    }
    
    .archive-doc-info {
        font-size: 0.75rem !important;
    }
    
    .image-slot img {
        height: 100px !important;
    }
}

/* Mark Anderson Case Files Mobile Adjustments */
@media (max-width: 768px) {
    /* Mark Anderson modal */
    .accounts-modal-content {
        width: 95% !important;
        padding: 20px !important;
    }
    
    .accounts-title {
        font-size: 1.6rem !important;
    }
    
    .accounts-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 15px !important;
    }
    
    .account-button {
        padding: 15px !important;
        min-height: 100px !important;
    }
    
    .account-icon {
        width: 35px !important;
        height: 35px !important;
        margin-bottom: 10px !important;
    }
    
    .account-name {
        font-size: 1rem !important;
    }
    
    .account-link {
        font-size: 0.8rem !important;
    }
    
    /* For very small screens */
    @media (max-width: 480px) {
        .accounts-grid {
            grid-template-columns: 1fr !important;
        }
    }
}
    `;
    document.head.appendChild(style);
}

// 2. Create the Archive Modal HTML
function createArchiveModal() {
    const modalHTML = `
    <div id="archive-modal">
        <div class="archive-modal-content">
            <span class="archive-close" id="archive-close">×</span>
            <h2 class="archive-title">ARCHIVE FOLDER</h2>
            
            <div class="archive-subtitle">
                The Folder of Archived M.R.I.S. Assets.
            </div>
            
            <div class="archive-terminal-output">
                <div class="archive-output-line">
                    <span class="archive-output-prefix">[STATUS]: </span>
                    <span class="archive-output-text"><span style="margin-left: 5px !important;">[6]</span> ASSET(S) AVAILABLE.</span>
                </div>
            </div>
            
            <div class="archive-folder">
                <div class="archive-folder-header">
                    <div class="archive-folder-title">
                        <i class="fas fa-folder-open"></i>
                        Archived Research Documents
                    </div>
                    <div class="archive-folder-controls">
                        <span class="archive-folder-count">4 file(s)</span>
                        <span class="archive-folder-toggle">
                            <i class="fas fa-chevron-down"></i>
                        </span>
                    </div>
                </div>

                <div class="archive-folder-content active">
                    <div class="archive-document">
                        <div class="archive-doc-title">[ARCH-001] Archived Assets</div>
                        <div class="archive-doc-info">ACCESS: LOCAL VIEWERS</div>
                        <div class="archive-doc-preview">Archived images from old research documents and approved media assets for the public viewers.</div>
                    </div>
                    
                    <div class="archive-document" style="border-left: 3px solid #ff003c !important;">
                        <div class="archive-doc-title" style="color: red;">[ARCH-012] Anatomical Analysis: Wild Human to human Sexual Reproduction</div>
                        <div class="archive-doc-info">Date: 2004-03-17 | Author: ████████████ | Status: RESTRICTED</div>
                        <div class="archive-doc-preview">Reproductive Outcomes of Interbreeding Between Homo sapiens and Homo ferus.</div>
                    </div>

                    <div class="archive-document">
                        <div class="archive-doc-title">[ARCH-032] ZETA-01 PROJECT</div>
                        <div class="archive-doc-info">Date: 2008-04-03 | Team: AERD (041)</div>
                        <div class="archive-doc-preview">The project aims to transform the human abilities from the 3rd dimension to the highest spatial layer. [ACCESS RESTRICTED: Under Development]</div>
                    </div>
                    
                   <div class="archive-document" data-document="hte_general">
    <div class="archive-doc-title">[ARCH-005] HTE_GENERAL - Human Transformation Experiment Files</div>
    <div class="archive-doc-info">Date: 1999-09-16 | Project: HT_EXPERIMENT | Status: TERMINATED [2001]</div>
    <div class="archive-doc-preview">Human Transformation Experiment. Contains redacted data on Incident 922 and biochemical markers.</div>
</div>
                </div>
            </div>
            
            <div class="archive-folder">
                <div class="archive-folder-header">
                    <div class="archive-folder-title">
                        <i class="fas fa-folder"></i>
                        Archived Cases & Reports
                    </div>
                    <div class="archive-folder-controls">
                        <span class="archive-folder-count">1 file(s)</span>
                        <span class="archive-folder-toggle">
                            <i class="fas fa-chevron-down"></i>
                        </span>
                    </div>
                </div>
                <div class="archive-folder-content">
                    <div class="archive-document">
                        <div class="archive-doc-title">[RVD-2006-1712] Mark Anderson</div>
                        <div class="archive-doc-info">Date: 2006-10-16 </div>
                        <div class="archive-doc-preview">Archived █████ Case files of the missing boy named Mark Anderson.</div>
                    </div>
                </div>
            </div>
            
            <div class="archive-folder">
                <div class="archive-folder-header">
                    <div class="archive-folder-title">
                        <i class="fas fa-folder"></i>
                        Archived Manuals & Protocols
                    </div>
                    <div class="archive-folder-controls">
                        <span class="archive-folder-count">1 file(s)</span>
                        <span class="archive-folder-toggle">
                            <i class="fas fa-chevron-down"></i>
                        </span>
                    </div>
                </div>
                <div class="archive-folder-content">
                     <div class="archive-document">
                        <div class="archive-doc-title">[CS-0975-112] Wild Humans (Protocol)</div>
                        <div class="archive-doc-info">Date: 1988-04-03 | Team: P.A.R.F. (UT-029)</div>
                        <div class="archive-doc-preview">This protocol aims to know how to deal and interact with Wild Humans. It covers various scenarios and provides guidelines for handling situations involving Wild Humans.</div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 25px; padding: 15px; background: rgba(0, 30, 0, 0.3); border-left: 3px solid #03d677;">
                <div style="color: #03d677; margin-bottom: 10px; font-weight: bold;">DEFINITION: </div>
                <div style="color: rgba(255, 255, 255, 0.8); line-height: 1.5;">
                    This folder provides access to archived M.R.I.S. data records. 
                    Documents are presented in their archived state, including redactions.
                </div>
            </div>
        </div>

            <!-- Error Modal for ARCH-012 and ARCH-032 -->
            <div class="archive-error-modal" id="archive-error-modal">
                <div class="archive-error-content">
                    <h3 class="archive-error-title">ACCESS DENIED</h3>
                    <div class="archive-error-message">
                        This file may be broken or cannot be accessed by local viewers.
                    </div>
                    <button class="archive-error-button" id="archive-error-acknowledge">ACKNOWLEDGE</button>
                </div>
            </div>
    </div>
    `;
    
    // Add to body
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = modalHTML;
    document.body.appendChild(tempDiv.firstElementChild);
    
    // Initialize archive functionality
    setupArchiveModal();
}

function setupArchiveModal() {
    const archiveModal = document.getElementById('archive-modal');
    const archiveClose = document.getElementById('archive-close');
    
    if (!archiveModal) return;
    
    // Close button
    if (archiveClose) {
        archiveClose.addEventListener('click', function() {
            archiveModal.style.display = 'none';
        });
    }
    
    // Setup folder toggles
    const folderHeaders = archiveModal.querySelectorAll('.archive-folder-header');
    folderHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const toggle = this.querySelector('.archive-folder-toggle i');
            const icon = this.querySelector('.archive-folder-title i');
            
            content.classList.toggle('active');
            
            if (content.classList.contains('active')) {
                if (toggle) toggle.className = 'fas fa-chevron-up';
                if (icon) icon.className = 'fas fa-folder-open';
            } else {
                if (toggle) toggle.className = 'fas fa-chevron-down';
                if (icon) icon.className = 'fas fa-folder';
            }
        });
    });
    
    // Setup document clicks - UPDATED VERSION
    const documents = archiveModal.querySelectorAll('.archive-document');
    documents.forEach(doc => {
        doc.addEventListener('click', function() {
            const documentType = this.getAttribute('data-document');
            const title = this.querySelector('.archive-doc-title').textContent;
            
            console.log('Archive document selected:', title, 'Type:', documentType);
            
            // Handle HTE_GENERAL (LEAVE THIS UNTOUCHED)
            if (documentType === 'hte_general') {
                setTimeout(() => {
                    const htexperimentModal = document.getElementById('hpexperiment-modal');
                    if (htexperimentModal) {
                        htexperimentModal.style.zIndex = '10060';
                        htexperimentModal.style.display = 'flex';
                        
                        // Make sure the close button works
                        const closeBtn = htexperimentModal.querySelector('.close-modal');
                        if (closeBtn) {
                            closeBtn.replaceWith(closeBtn.cloneNode(true));
                            const newCloseBtn = htexperimentModal.querySelector('.close-modal');
                            
                            newCloseBtn.addEventListener('click', function() {
                                htexperimentModal.style.display = 'none';
                                htexperimentModal.style.zIndex = '';
                            });
                        }

                        
                        
                        // Reinitialize image modal functionality if needed
                        const modalImages = htexperimentModal.querySelectorAll('.modal-image');
                        modalImages.forEach(img => {
                            img.addEventListener('click', function() {
                                const expandedImg = document.getElementById('expanded-image');
                                const imageCaption = document.getElementById('image-caption');
                                const imageModal = document.getElementById('image-modal');
                                
                                if (expandedImg && imageCaption && imageModal) {
                                    expandedImg.src = this.src;
                                    imageCaption.textContent = this.getAttribute('data-caption') || 'Research Image';
                                    imageModal.style.zIndex = '10070';
                                    imageModal.style.display = 'flex';
                                    
                                    // Setup image modal close
                                    const closeImageModal = imageModal.querySelector('.close-image-modal');
                                    if (closeImageModal) {
                                        closeImageModal.onclick = function() {
                                            imageModal.style.display = 'none';
                                            imageModal.style.zIndex = '';
                                        };
                                    }
                                }
                            });
                        });
                    }
                }, 300);
            } 

             else if (title.includes('[ARCH-001]')) {
            showGalleryDocument();
        }

           else if (title.includes('[RVD-2006-1712]')) {
    showMarkAndersonCaseFiles();
}
               


                    // Handle CS-0975-112 Wild Humans Protocol - Show ACCESS DENIED
        else if (title.includes('[CS-0975-112]')) {
            // Create blurry background
            const bgOverlay = document.createElement('div');
            bgOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(5px);
                z-index: 10054;
            `;
            
            // Create error modal
            const errorDiv = document.createElement('div');
            errorDiv.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(60, 0, 0, 0.95);
                    border: 2px solid #ff003c;
                    padding: 30px;
                    z-index: 10055;
                    color: #ff003c;
                    text-align: center;
                    border-radius: 8px;
                    box-shadow: 0 0 40px rgba(255, 0, 60, 0.5);
                    max-width: 90vw;
                    width: auto;
                    min-width: 280px;
                    max-width: 500px;
                    box-sizing: border-box;
                ">
                    <h3 style="margin: 0 0 20px 0; font-size: clamp(1.2rem, 4vw, 1.5rem);">ACCESS DENIED</h3>
                    <p style="color: #ff6666; margin-bottom: 25px; font-size: clamp(0.9rem, 3vw, 1rem); line-height: 1.4;">
                        This file may be broken or cannot be accessed by local viewers.
                    </p>
                    <button id="error-acknowledge-btn-cs" style="
                        background: rgba(255, 0, 60, 0.2);
                        color: #ff003c;
                        border: 1px solid #ff003c;
                        padding: 12px 30px;
                        cursor: pointer;
                        font-size: clamp(0.9rem, 3vw, 1rem);
                        min-height: 44px;
                        touch-action: manipulation;
                    ">ACKNOWLEDGE</button>
                </div>
            `;
            
            document.body.appendChild(bgOverlay);
            document.body.appendChild(errorDiv);
            
            // Add event listener to the button
            const button = document.getElementById('error-acknowledge-btn-cs');
            if (button) {
                button.addEventListener('click', function() {
                    document.body.removeChild(errorDiv);
                    if (document.body.contains(bgOverlay)) {
                        document.body.removeChild(bgOverlay);
                    }
                });
                
                // Touch event for mobile
                button.addEventListener('touchstart', function(e) {
                    e.stopPropagation();
                });
            }
            
            // Close when clicking background
            bgOverlay.addEventListener('click', function() {
                document.body.removeChild(errorDiv);
                if (document.body.contains(bgOverlay)) {
                    document.body.removeChild(bgOverlay);
                }
            });
        }
            // Handle ARCH-012 - Show error alert
            else if (title.includes('[ARCH-012]')) {
                // Simple red-themed alert
                const errorDiv = document.createElement('div');
                errorDiv.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: rgba(60, 0, 0, 0.95);
                        border: 2px solid #ff003c;
                        padding: 30px;
                        z-index: 10055;
                        color: #ff003c;
                        text-align: center;
                        border-radius: 8px;
                        box-shadow: 0 0 40px rgba(255, 0, 60, 0.5);
                        max-width: 90vw;
                        width: auto;
                        min-width: 280px;
                        max-width: 500px;
                        box-sizing: border-box;
                    ">
                        <h3 style="margin: 0 0 20px 0; font-size: clamp(1.2rem, 4vw, 1.5rem);">ACCESS DENIED</h3>
                        <p style="color: #ff6666; margin-bottom: 25px; font-size: clamp(0.9rem, 3vw, 1rem); line-height: 1.4;">
                            This file may be broken or cannot be accessed by local viewers.
                        </p>
                        <button id="error-acknowledge-btn" style="
                            background: rgba(255, 0, 60, 0.2);
                            color: #ff003c;
                            border: 1px solid #ff003c;
                            padding: 12px 30px;
                            cursor: pointer;
                            font-size: clamp(0.9rem, 3vw, 1rem);
                            min-height: 44px;
                            touch-action: manipulation;
                        ">ACKNOWLEDGE</button>
                    </div>
                `;
                                // Add blurry black background
                const bgOverlay = document.createElement('div');
                bgOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(5px);
                    z-index: 10054;
                `;
                document.body.appendChild(bgOverlay);
                
                document.body.appendChild(errorDiv);
                
                // Add event listener to the button
                const button = document.getElementById('error-acknowledge-btn');
                if (button) {
                    button.addEventListener('click', function() {
                        document.body.removeChild(errorDiv);
                           // Also remove the overlay
                    if (document.body.contains(bgOverlay)) {
                        document.body.removeChild(bgOverlay);
                    }
                    });
                    
                    // Touch event for mobile
                    button.addEventListener('touchstart', function(e) {
                        e.stopPropagation();
                    });
                }
                
                // Close when clicking outside
                errorDiv.addEventListener('click', function(e) {
                    if (e.target === errorDiv) {
                        document.body.removeChild(errorDiv);
                    }
                });
                
                // Prevent touch scroll on modal
                errorDiv.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, { passive: false });
            }
            // Handle ARCH-032 - Same as ARCH-012
            else if (title.includes('[ARCH-032]')) {
                // Simple red-themed alert
                const errorDiv = document.createElement('div');
                errorDiv.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: rgba(60, 0, 0, 0.95);
                        border: 2px solid #ff003c;
                        padding: 30px;
                        z-index: 10055;
                        color: #ff003c;
                        text-align: center;
                        border-radius: 8px;
                        box-shadow: 0 0 40px rgba(255, 0, 60, 0.5);
                        max-width: 90vw;
                        width: auto;
                        min-width: 280px;
                        max-width: 500px;
                        box-sizing: border-box;
                    ">
                        <h3 style="margin: 0 0 20px 0; font-size: clamp(1.2rem, 4vw, 1.5rem);">ACCESS DENIED</h3>
                        <p style="color: #ff6666; margin-bottom: 25px; font-size: clamp(0.9rem, 3vw, 1rem); line-height: 1.4;">
                            This file may be broken or cannot be accessed by local viewers.
                        </p>
                        <button id="error-acknowledge-btn-2" style="
                            background: rgba(255, 0, 60, 0.2);
                            color: #ff003c;
                            border: 1px solid #ff003c;
                            padding: 12px 30px;
                            cursor: pointer;
                            font-size: clamp(0.9rem, 3vw, 1rem);
                            min-height: 44px;
                            touch-action: manipulation;
                        ">ACKNOWLEDGE</button>
                    </div>
                `;
                                // Add blurry black background
                const bgOverlay = document.createElement('div');
                bgOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(5px);
                    z-index: 10054;
                `;
                document.body.appendChild(bgOverlay);
                
        
                document.body.appendChild(errorDiv);
                

                
                // Add event listener to the button
                const button = document.getElementById('error-acknowledge-btn-2');
                if (button) {
                    button.addEventListener('click', function() {
                        document.body.removeChild(errorDiv);
                                    // Also remove the overlay
                    if (document.body.contains(bgOverlay)) {
                        document.body.removeChild(bgOverlay);
                    }
                    });
                    
                    // Touch event for mobile
                    button.addEventListener('touchstart', function(e) {
                        e.stopPropagation();
                    });
                }
                
                // Close when clicking outside
                errorDiv.addEventListener('click', function(e) {
                    if (e.target === errorDiv) {
                        document.body.removeChild(errorDiv);
                    }
                });
                
                // Prevent touch scroll on modal
                errorDiv.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, { passive: false });
            }
            else {
                // For other documents, just log for now
                console.log('Opening document:', documentType);
            }
        });
    });
    
    // Function to open archive modal (for use by interceptArchiveCommand)
    window.openArchiveModal = function() {
        archiveModal.style.display = 'flex';
    };
    
    // Function to close archive modal
    window.closeArchiveModal = function() {
        archiveModal.style.display = 'none';
    };
}
// 4. Intercept the /archive command in the existing terminal
function interceptArchiveCommand() {
    // Wait a moment for the terminal to initialize
    setTimeout(() => {
        const terminalInput = document.getElementById('smol-terminal-input');
        const terminalOutput = document.getElementById('smol-terminal-output');
        
        if (!terminalInput) {
            console.log('Terminal input not found, retrying...');
            setTimeout(interceptArchiveCommand, 1000);
            return;
        }
        
        // Store original event listener
        const originalKeydown = terminalInput.onkeydown;
        
        // Add our own listener
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim();
                
                if (command.toLowerCase() === '/archive') {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    this.value = '';
                    
                    // Add to output
                    if (terminalOutput) {
                        const outputLine = document.createElement('div');
                        outputLine.className = 'smol-output-line';
                        outputLine.innerHTML = `<span class="smol-prompt">></span><span class="smol-text" style="color: var(--main-glow)"> ${command}</span>`;
                        terminalOutput.appendChild(outputLine);
                        
                        const responseLine = document.createElement('div');
                        responseLine.className = 'smol-output-line';
                        responseLine.innerHTML = `<span class="smol-prompt">✓</span><span class="smol-text" style="color: var(--main-glow)"> Opening archive folder...</span>`;
                        terminalOutput.appendChild(responseLine);
                        
                        terminalOutput.scrollTop = terminalOutput.scrollHeight;
                    }
                    
                    // Open archive modal
               // Open archive modal
setTimeout(() => {
    const archiveModal = document.getElementById('archive-modal');
    if (archiveModal && window.openArchiveModal) {
        window.openArchiveModal();
        
        // Close smol terminal if open
        const smolTerminal = document.getElementById('smol-terminal');
        if (smolTerminal && smolTerminal.classList.contains('active')) {
            smolTerminal.classList.remove('active');
        }
    }
}, 800);
                    
                    return false;
                }
            }
        }, true); // Use capture phase to intercept first
        
        console.log('Archive command interceptor installed');
    }, 2000); // Wait 2 seconds for everything to load
}

// 5. Update the help command to include /archive
function updateHelpCommand() {
    setTimeout(() => {
        // This is a bit hacky but works without modifying original code
        const terminalInput = document.getElementById('smol-terminal-input');
        
        if (!terminalInput) return;
        
        // Listen for /help command
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                
                if (command === '/help') {
                    // Wait a moment for the original help to display
                    setTimeout(() => {
                        const terminalOutput = document.getElementById('smol-terminal-output');
                        if (terminalOutput) {
                            // Look for the help output and add our line
                            const helpLines = terminalOutput.querySelectorAll('.smol-output-line');
                            
                            // Find the line with "Archive Terminal = /archive" 
                            // If not found, add it
                            let hasArchive = false;
                            helpLines.forEach(line => {
                                if (line.textContent.includes('Archive Terminal')) {
                                    hasArchive = true;
                                }
                            });
                            
                            if (!hasArchive) {
                                // Find where to insert (before Clear = /clear)
                                setTimeout(() => {
                                    const allText = terminalOutput.textContent;
                                    if (allText.includes('Clear = /clear') && !allText.includes('Archive Terminal')) {
                                        // This is hacky but works
                                        console.log('Archive help line would be added here');
                                    }
                                }, 500);
                            }
                        }
                    }, 100);
                }
            }
        });
    }, 3000);
}

// 6. MAIN INITIALIZATION - Add this to your DOMContentLoaded
function initializeArchiveSystem() {
    console.log('Initializing Archive System...');
    
    // 1. Add styles
    addArchiveStyles();
    
    // 2. Create modal
    createArchiveModal();
    // Close button functionality will be handled in setupArchiveModal()
// The HTML already has: <span class="archive-close" id="archive-close">×</span>
    // 3. Setup interceptors
    interceptArchiveCommand();
    
    // 4. Update help (optional)
    updateHelpCommand();
    
    console.log('Archive System initialized successfully');
}

// 7. START THE ARCHIVE SYSTEM
// Add this line at the VERY END of your script, outside all functions:
document.addEventListener('DOMContentLoaded', initializeArchiveSystem);

function debugModalLayers() {
    console.log('=== MODAL Z-INDEX DEBUG ===');
    const modals = document.querySelectorAll('.modal, #archive-modal, #image-modal');
    modals.forEach(modal => {
        const zIndex = window.getComputedStyle(modal).zIndex;
        console.log(`${modal.id || 'unnamed-modal'}: z-index = ${zIndex}, display = ${modal.style.display}`);
    });
    console.log('==========================');
}

// Call it when opening archive
window.openArchiveModal = function() {

    archiveModal.style.display = 'flex';
    
    // Debug
    debugModalLayers();
};

// Create Accounts Modal HTML
function createAccountsModal() {
    const modalHTML = `
    <div id="accounts-modal">
        <div class="accounts-modal-content">
            <span class="accounts-close" id="accounts-close">×</span>
            <h2 class="accounts-title">MY SOCIAL MEDIA ACCOUNTS</h2>
            <div class="accounts-subtitle">Connect with me across platforms</div>
            
            <div class="accounts-grid">
                <!-- Discord -->
                <div class="account-button" data-account="discord">
                    <img src="https://files.catbox.moe/96xkw5.png" alt="Discord" class="account-icon">
                    <div class="account-name">Discord</div>
                    <div class="account-link">@obscure2652</div>
                </div>
                
                <!-- JanitorAI -->
                <div class="account-button" data-account="janitor">
                    <img src="https://files.catbox.moe/ehcrjb.png" alt="JanitorAI" class="account-icon">
                    <div class="account-name">JanitorAI</div>
                    <div class="account-link">OBSCURE Profile</div>
                </div>
                
                <!-- X/Twitter -->
                <div class="account-button" data-account="twitter">
                    <img src="https://files.catbox.moe/gbc91r.png" alt="Twitter" class="account-icon">
                    <div class="account-name">X/Twitter</div>
                    <div class="account-link">@OBSCURE322173</div>
                </div>
                
                <!-- ChubAI -->
                <div class="account-button" data-account="chubai">
                    <img src="https://files.catbox.moe/6ff3cy.png" alt="ChubAI" class="account-icon">
                    <div class="account-name">ChubAI</div>
                    <div class="account-link">OBSCURE265</div>
                </div>
                
                <!-- DeviantART -->
                <div class="account-button" data-account="deviantart">
                    <img src="https://files.catbox.moe/znp94d.png" alt="DeviantART" class="account-icon">
                    <div class="account-name">DeviantART</div>
                    <div class="account-link">obscure2234</div>
                </div>
            </div>
            
            <div class="accounts-note">
                <div class="accounts-note-text">
                    If you want to ask a question, let me know!
                </div>
            </div>
        </div>
    </div>
    `;
    
    // Add to body
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = modalHTML;
    document.body.appendChild(tempDiv.firstElementChild);
    
    // Initialize accounts functionality
    setupAccountsModal();
}

// Setup Accounts Modal Functionality
function setupAccountsModal() {
    const accountsModal = document.getElementById('accounts-modal');
    const accountsClose = document.getElementById('accounts-close');
    
    if (!accountsModal) return;
    
    // Account URLs
    const accountLinks = {
        'discord': 'https://discordapp.com/users/1433583472240234596',
        'janitor': 'https://janitorai.com/profiles/45af9511-3411-40db-8737-217fcb7284e8_profile-of-obscure',
        'twitter': 'https://x.com/OBSCURE322173',
        'chubai': 'https://chub.ai/users/OBSCURE265',
        'deviantart': 'https://www.deviantart.com/obscure2234'
    };
    
    // Store original body styles
    let originalBodyOverflow = '';
    
    // Close button
    if (accountsClose) {
        accountsClose.addEventListener('click', function() {
            accountsModal.style.display = 'none';
            // Restore body scroll
            document.body.style.overflow = originalBodyOverflow;
        });
    }
    
    // Setup account button clicks
    const accountButtons = accountsModal.querySelectorAll('.account-button');
    accountButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accountType = this.getAttribute('data-account');
            const accountName = this.querySelector('.account-name').textContent;
            
            if (accountLinks[accountType]) {
                // Open in new tab
                window.open(accountLinks[accountType], '_blank');
                
                // Optional: Add visual feedback
                this.style.background = 'rgba(0, 255, 115, 0.2)';
                setTimeout(() => {
                    this.style.background = '';
                }, 300);
            }
        });
    });
    
    // Function to open accounts modal
    window.openAccountsModal = function() {
        // Store original body overflow

 
        
        accountsModal.style.display = 'flex';
    };
    
    // Function to close accounts modal
    window.closeAccountsModal = function() {
        accountsModal.style.display = 'none';
        // Restore body scroll
        document.body.style.overflow = originalBodyOverflow;
    };
}

// Intercept the /accounts command
function interceptAccountsCommand() {
    setTimeout(() => {
        const terminalInput = document.getElementById('smol-terminal-input');
        const terminalOutput = document.getElementById('smol-terminal-output');
        
        if (!terminalInput) {
            setTimeout(interceptAccountsCommand, 1000);
            return;
        }
        
        // Add listener for /accounts command
        terminalInput.addEventListener('keydown', function accountsKeyHandler(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim();
                
                if (command.toLowerCase() === '/accounts') {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    this.value = '';
                    
                    // Add to terminal output
                    if (terminalOutput) {
                        const outputLine = document.createElement('div');
                        outputLine.className = 'smol-output-line';
                        outputLine.innerHTML = `<span class="smol-prompt">></span><span class="smol-text" style="color: var(--main-glow)"> ${command}</span>`;
                        terminalOutput.appendChild(outputLine);
                        
                        const responseLine = document.createElement('div');
                        responseLine.className = 'smol-output-line';
                        responseLine.innerHTML = `<span class="smol-prompt">✓</span><span class="smol-text" style="color: var(--main-glow)"> Opening accounts panel...</span>`;
                        terminalOutput.appendChild(responseLine);
                        
                        terminalOutput.scrollTop = terminalOutput.scrollHeight;
                    }
                    
                    // Open accounts modal
                    setTimeout(() => {
                        if (window.openAccountsModal) {
                            window.openAccountsModal();
                            
                            // Close smol terminal if open
                            const smolTerminal = document.getElementById('smol-terminal');
                            if (smolTerminal && smolTerminal.classList.contains('active')) {
                                smolTerminal.classList.remove('active');
                            }
                        } else {
                            // Fallback
                            const accountsModal = document.getElementById('accounts-modal');
                            if (accountsModal) {
                                accountsModal.style.display = 'flex';
                            }
                        }
                    }, 800);
                    
                    return false;
                }
            }
        }, true);
        
        console.log('Accounts command interceptor installed');
    }, 2000);
}

// Complete Accounts System Initialization
function initializeAccountsSystem() {
    console.log('Initializing Accounts System...');
    
    // Add styles (you might want to merge with addArchiveStyles)
    const style = document.createElement('style');
    style.textContent = `
        /* Accounts Modal Styles - Add all the CSS from Step 1 here */
    `;
    document.head.appendChild(style);
    
    // Create modal
    createAccountsModal();
    
    // Setup interceptors
    interceptAccountsCommand();
    
    console.log('Accounts System initialized successfully');
}

// Start the system
document.addEventListener('DOMContentLoaded', function() {
    initializeAccountsSystem();
    // ... your other initializations
});
// ==UserScript==
// @name         YouTube to YouTube No-Cookie Embed Player
// @namespace    https://gist.github.com/thedoggybrad/4e17b0046ce072afc3f31610dcdef32a
// @version      0.0.3
// @description  RedirectYouTube video URLs to the no-cookie embed player and stop all requests from loading
// @author       TheDoggyBrad Software Labs
// @match        https://www.youtube.com/*
// @grant        none
// @license      MIT--0
// @run-at       document-start
// @downloadURL  https://librespeed.elementfx.com/yttoytembed-cdn/youtube_to_youtube_no_cookie_embed_player.js
// @updateURL    https://librespeed.elementfx.com/yttoytembed-cdn/youtube_to_youtube_no_cookie_embed_player.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to block all network requests
    function blockNetworkRequests() {
        // Intercept fetch API
        const originalFetch = window.fetch;
        window.fetch = function() {
            return new Promise((resolve, reject) => {
                // Reject all network requests made to YouTube domains
                if (arguments[0].includes('youtube.com') || arguments[0].includes('google.com')) {
                    reject('Blocked YouTube Request');
                } else {
                    resolve(originalFetch.apply(this, arguments));
                }
            });
        };

        // Intercept XMLHttpRequest
        const originalXHR = window.XMLHttpRequest;
        window.XMLHttpRequest = function() {
            const xhr = new originalXHR();
            const originalOpen = xhr.open;
            xhr.open = function(method, url) {
                if (url.includes('youtube.com') || url.includes('google.com')) {
                    console.log('Blocked YouTube Request');
                    xhr.abort();
                } else {
                    originalOpen.apply(this, arguments);
                }
            };
            return xhr;
        };
    }

    // Function to redirect to no-cookie embed
    function redirectToEmbed() {
        let currentUrl = window.location.href;

        // Check if the current URL is a YouTube video page
        let match = currentUrl.match(/https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);

        if (match) {
            let videoId = match[1];
            let embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

            // Redirect immediately without letting the original page load
            if (window.location.href !== embedUrl) {
                window.location.replace(embedUrl); // Prevent page load by redirecting
            }
        }
    }

    // Run the redirection as early as possible (before any content loads)
    redirectToEmbed();

    // Block all network requests (scripts, images, etc.) to YouTube and Google domains
    blockNetworkRequests();

})();

// Function to handle HTE_GENERAL image clicks
function setupHTEImages() {
    // Wait for modal to exist
    setTimeout(() => {
        const hteModal = document.getElementById('hpexperiment-modal');
        if (!hteModal) return;
        
        const imageSlots = hteModal.querySelectorAll('.image-slot');
        imageSlots.forEach(slot => {
            // Remove any existing event listeners first
            const newSlot = slot.cloneNode(true);
            slot.parentNode.replaceChild(newSlot, slot);
            
            // Add new event listener
            newSlot.addEventListener('click', function() {
                const img = this.querySelector('img');
                const caption = this.querySelector('div').textContent;
                
                if (img && img.src) {
                    showExpandedImage(img.src, caption);
                }
            });
            
            // Add hover effects
            newSlot.addEventListener('mouseover', function() {
                this.style.background = 'rgba(255, 0, 60, 0.1)';
                this.style.boxShadow = '0 0 15px rgba(255, 0, 60, 0.3)';
            });
            
            newSlot.addEventListener('mouseout', function() {
                this.style.background = 'rgba(80, 0, 0, 0.3)';
                this.style.boxShadow = 'none';
            });
        });
    }, 1000);
}
// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code ...
    
    setupHTEImages();
    
    // Also re-setup when modal opens (in case it's created dynamically)
    document.addEventListener('click', function(e) {
        if (e.target.closest && e.target.closest('.archive-document[data-document="hte_general"]')) {
            setTimeout(setupHTEImages, 500);
        }
    });
});

// Add this function to show Mark Anderson case files when clicked in the archive modal
function showMarkAndersonCaseFiles() {
    // Get the Mark Anderson modal
    const markAndersonModal = document.getElementById('mark-anderson-modal');
    if (!markAndersonModal) {
        console.error('Mark Anderson modal not found');
        return;
    }
    
    // Display the modal
    markAndersonModal.style.display = 'flex';
    markAndersonModal.style.zIndex = '10060'; // Ensure it's above the archive modal
    
    // Update the archive modal to hide it or lower its z-index
    const archiveModal = document.getElementById('archive-modal');
    if (archiveModal) {
        archiveModal.style.zIndex = '10049'; // Lower than the Anderson modal
    }
    
    // Setup the close button functionality for this modal when opened from archive
    const closeBtn = markAndersonModal.querySelector('.close-modal');
    if (closeBtn) {
        // Replace with a fresh copy to avoid duplicate listeners
        closeBtn.replaceWith(closeBtn.cloneNode(true));
        const newCloseBtn = markAndersonModal.querySelector('.close-modal');
        
        newCloseBtn.addEventListener('click', function() {
            markAndersonModal.style.display = 'none';
            
            // Restore the archive modal's z-index
            const archiveModal = document.getElementById('archive-modal');
            if (archiveModal && archiveModal.style.display === 'flex') {
                archiveModal.style.zIndex = '10050';
            }
        });
    }
    
    // Reinitialize image modal functionality for the Mark Anderson images
    const modalImages = markAndersonModal.querySelectorAll('.modal-image');
    modalImages.forEach(img => {
        img.addEventListener('click', function() {
            const expandedImg = document.getElementById('expanded-image');
            const imageCaption = document.getElementById('image-caption');
            const imageModal = document.getElementById('image-modal');
            
            if (expandedImg && imageCaption && imageModal) {
                expandedImg.src = this.src;
                imageCaption.textContent = this.getAttribute('data-caption') || 'Research Image';
                imageModal.style.zIndex = '10070';
                imageModal.style.display = 'flex';
                
                // Setup image modal close
                const closeImageModal = imageModal.querySelector('.close-image-modal');
                if (closeImageModal) {
                    closeImageModal.onclick = function() {
                        imageModal.style.display = 'none';
                        imageModal.style.zIndex = '';
                    };
                }
            }
        });
    });
    
    // Close when clicking outside the modal
    window.addEventListener('click', function closeOutside(e) {
        if (e.target === markAndersonModal) {
            markAndersonModal.style.display = 'none';
            
            // Restore the archive modal's z-index
            const archiveModal = document.getElementById('archive-modal');
            if (archiveModal && archiveModal.style.display === 'flex') {
                archiveModal.style.zIndex = '10050';
            }
            
            // Remove this event listener
            window.removeEventListener('click', closeOutside);
        }
    });
}

// Simple gallery modal handler - Add this at the END of script.js
document.addEventListener('DOMContentLoaded', function() {
    // Wait a moment for everything to load
    setTimeout(function() {
        const galleryItem = document.querySelector('.human-predator-item[data-origin="natural-gallery"]');
        const galleryModal = document.getElementById('natural-gallery-modal');
        
        if (galleryItem && galleryModal) {
            galleryItem.addEventListener('click', function() {
                galleryModal.style.display = 'flex';
                
                // Play click sound if enabled
                const clickToggle = document.getElementById('click-toggle');
                const clickSound = document.getElementById('clickSound');
                if (clickToggle && clickToggle.textContent === 'ON' && clickSound) {
                    clickSound.currentTime = 0;
                    clickSound.play().catch(e => console.log('Click sound failed'));
                }
            });
            
            // Close button
            const closeBtn = galleryModal.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    galleryModal.style.display = 'none';
                });
            }
            
            // Close when clicking outside
            window.addEventListener('click', function(e) {
                if (e.target === galleryModal) {
                    galleryModal.style.display = 'none';
                }
            });
            
            // Set up image modal for the gallery images
            const galleryImages = galleryModal.querySelectorAll('.modal-image');
            galleryImages.forEach(image => {
                image.addEventListener('click', function() {
                    const expandedImage = document.getElementById('expanded-image');
                    const imageCaption = document.getElementById('image-caption');
                    const imageModal = document.getElementById('image-modal');
                    
                    if (expandedImage && imageCaption && imageModal) {
                        expandedImage.src = this.src;
                        imageCaption.textContent = this.getAttribute('data-caption') || 'Research Image';
                        imageModal.style.display = 'flex';
                    }
                });
            });
            
            console.log('Gallery modal initialized successfully');
        }
    }, 1000);
});

// Function to show Gallery document when clicked from Archive modal
function showGalleryDocument() {
    // Get the gallery modal
    const galleryModal = document.getElementById('natural-gallery-modal');
    if (!galleryModal) {
        console.error('Gallery modal not found');
        return;
    }
    
    // Display the modal
    galleryModal.style.display = 'flex';
    galleryModal.style.zIndex = '10060'; // Ensure it's above the archive modal
    
    // Lower the archive modal's z-index
    const archiveModal = document.getElementById('archive-modal');
    if (archiveModal) {
        archiveModal.style.zIndex = '10049';
    }
    
    // Setup the close button functionality
    const closeBtn = galleryModal.querySelector('.close-modal');
    if (closeBtn) {
        // Replace with a fresh copy to avoid duplicate listeners
        closeBtn.replaceWith(closeBtn.cloneNode(true));
        const newCloseBtn = galleryModal.querySelector('.close-modal');
        
        newCloseBtn.addEventListener('click', function() {
            galleryModal.style.display = 'none';
            
            // Restore the archive modal's z-index
            const archiveModal = document.getElementById('archive-modal');
            if (archiveModal && archiveModal.style.display === 'flex') {
                archiveModal.style.zIndex = '10050';
            }
        });
    }
    
    // Reinitialize image modal functionality for gallery images
    const modalImages = galleryModal.querySelectorAll('.modal-image');
    modalImages.forEach(img => {
        img.addEventListener('click', function() {
            const expandedImg = document.getElementById('expanded-image');
            const imageCaption = document.getElementById('image-caption');
            const imageModal = document.getElementById('image-modal');
            
            if (expandedImg && imageCaption && imageModal) {
                expandedImg.src = this.src;
                imageCaption.textContent = this.getAttribute('data-caption') || 'Research Image';
                imageModal.style.zIndex = '10070';
                imageModal.style.display = 'flex';
                
                // Setup image modal close
                const closeImageModal = imageModal.querySelector('.close-image-modal');
                if (closeImageModal) {
                    closeImageModal.onclick = function() {
                        imageModal.style.display = 'none';
                        imageModal.style.zIndex = '';
                    };
                }
            }
        });
    });
    
    // Close when clicking outside the modal
    window.addEventListener('click', function closeOutside(e) {
        if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
            
            // Restore the archive modal's z-index
            const archiveModal = document.getElementById('archive-modal');
            if (archiveModal && archiveModal.style.display === 'flex') {
                archiveModal.style.zIndex = '10050';
            }
            
        
            window.removeEventListener('click', closeOutside);
        }
    });
}

