using System;
using Windows.ApplicationModel.Core;
using Windows.UI;
using Windows.UI.ViewManagement;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

namespace Lee
{
    /// <summary>
    /// Root page of the application
    /// </summary>
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();

            // Extend view into titlebar
            CoreApplication.GetCurrentView().TitleBar.ExtendViewIntoTitleBar = true;

            // Unify the design of the titlebar buttons
            var viewTitleBar = ApplicationView.GetForCurrentView().TitleBar;
            viewTitleBar.ButtonBackgroundColor = Colors.Transparent;
            viewTitleBar.ButtonInactiveBackgroundColor = Colors.Transparent;
            viewTitleBar.ButtonForegroundColor = (Color)Resources["SystemBaseHighColor"];

            // Make a custom border draggable as the titlebar
            Window.Current.SetTitleBar(TitleBar);
        }

        private async void DisplayAboutDialog()
        {
            ContentDialog aboutDialog = new ContentDialog
            {
                Title = "About Lee",
                Content = "Lee is a media player for Windows 10.",
                CloseButtonText = "OK"
            };

            ContentDialogResult result = await aboutDialog.ShowAsync();
        }

        private async void DisplayFileOpenURLDialog()
        {
            ContentDialog dialog = new ContentDialog
            {
                Title = "Open a URL",
                Content = "TO BE IMPLEMENTED",
                CloseButtonText = "Load"
            };

            ContentDialogResult result = await dialog.ShowAsync();
        }

        private void M_Help_Click(object sender, RoutedEventArgs e)
        {
            this.DisplayAboutDialog();
        }

        private async void M_FileOpen_Click(object sender, RoutedEventArgs e)
        {
            var picker = new Windows.Storage.Pickers.FileOpenPicker();
            picker.ViewMode = Windows.Storage.Pickers.PickerViewMode.Thumbnail;
            picker.SuggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.VideosLibrary;
            picker.FileTypeFilter.Add(".mp4");
            picker.FileTypeFilter.Add(".webm");
            picker.FileTypeFilter.Add(".mp3");
            picker.FileTypeFilter.Add(".flac");
            picker.FileTypeFilter.Add(".wmv");
            picker.FileTypeFilter.Add(".wav");

            Windows.Storage.StorageFile file = await picker.PickSingleFileAsync();
            if (file != null)
            {
                // Application now has read/write access to the picked file
                Console.WriteLine(file.Name);
            }
            else
            {
                Console.WriteLine("User has decided to cancel the operation.");
            }
        }

        private void M_FileOpenURL_Click(object sender, RoutedEventArgs e)
        {
            this.DisplayFileOpenURLDialog();
        }

        private void M_FileExit_Click(object sender, RoutedEventArgs e)
        {
            Application.Current.Exit();
        }
    }
}