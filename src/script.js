document.addEventListener('DOMContentLoaded', function () {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab');

      tabContents.forEach((content) => {
        content.classList.add('hidden');
      });

      const targetContent = document.getElementById(target);
      if (targetContent) {
        targetContent.classList.remove('hidden');
      }

      tabButtons.forEach((btn) =>
        btn.classList.remove('border-primary', 'text-black')
      );

      button.classList.add('border-primary', 'text-black');
    });
  });

  tabButtons[0]?.click();
});
