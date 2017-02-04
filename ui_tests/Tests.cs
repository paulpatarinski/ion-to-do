using System;
using System.Threading;
using NUnit.Framework;
using Xamarin.UITest;

namespace ui_tests
{
    [TestFixture(Platform.Android)]
    [TestFixture(Platform.iOS)]
    public class Tests
    {
        IApp app;
        Platform platform;

        public Tests(Platform platform)
        {
            this.platform = platform;
        }

        [SetUp]
        public void BeforeEachTest()
        {
            app = AppInitializer.StartApp(platform);
        }

        [Test]
        public void Generate_App_Screenshots()
        {
            app.WaitForElement(c => c.Css("#todo-input"));
            Thread.Sleep(TimeSpan.FromSeconds(2));
            TakeScreenshot("Home Page");

            app.EnterText(c => c.Css("#todo-input"),"Throw out the garbage");
            Thread.Sleep(TimeSpan.FromSeconds(1));
            TakeScreenshot("Add to do");
           
            app.PressEnter();
            app.DismissKeyboard();

            app.SwipeLeftToRight(c => c.Css("#todo-item"),0.1);
            Thread.Sleep(TimeSpan.FromSeconds(2));
            TakeScreenshot("Swipe right to complete");

            app.SwipeLeftToRight(c => c.Css("#todo-item"));
            Thread.Sleep(TimeSpan.FromSeconds(2));

            app.Tap(c => c.Css("#tab-t0-1"));
            Thread.Sleep(TimeSpan.FromSeconds(2));
            TakeScreenshot("History");
        }

		private void TakeScreenshot(string screenshotTitle)
		{
            var plt = platform == Platform.Android ? "android" : "ios";
			var screenshotFileInfo = app.Screenshot(screenshotTitle);
			var device = AppInitializer.AppConfig.phone ? "phone" : "tablet";
			var newScreenshotName = screenshotFileInfo.Name.Replace("screenshot",device);
			var newFilePath = $"{screenshotFileInfo.Directory}/{plt}-{newScreenshotName}";
			screenshotFileInfo.MoveTo(newFilePath);
		}
    }
}
