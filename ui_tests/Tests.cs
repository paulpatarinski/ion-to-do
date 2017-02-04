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
            app.WaitForElement(c => c.Css("#unlearn-btn"));
            Thread.Sleep(TimeSpan.FromSeconds(2));
            TakeScreenshot("Home Page");

            if (AppInitializer.AppConfig.phone)
                app.Tap(c => c.Css("#unlearn-btn"));
            else
                //This is hack for some reason Xam UI can't find the correct coordinates
                app.TapCoordinates(379, 1000);

            app.WaitForElement(c => c.Css("#random-img"));
            TakeScreenshot("Gallery Fact 1");

            app.Tap(c => c.Css("#random-img"));
            Thread.Sleep(TimeSpan.FromSeconds(2));

            app.Tap(c => c.Css("#random-img"));
            TakeScreenshot("Quote 1");

            Thread.Sleep(TimeSpan.FromSeconds(2));

            if (AppInitializer.AppConfig.phone)
                app.Tap(c => c.Css("#share-btn"));
            else
                //This is hack for some reason Xam UI can't find the correct coordinates
                app.TapCoordinates(1000, 42);

            TakeScreenshot("Share");

            if (AppInitializer.AppConfig.phone)
	            app.Tap(c => c.Marked("Cancel"));
			else 
            	app.Tap(c => c.Css("#random-img"));

            app.Tap(c => c.Css(".back-button"));

            if (AppInitializer.AppConfig.phone)
                app.Tap(c => c.Css("#about-btn"));
            else
                //This is hack for some reason Xam UI can't find the correct coordinates
                app.TapCoordinates(379, 1300);

            Thread.Sleep(TimeSpan.FromSeconds(1));
            TakeScreenshot("About Page");
            app.Tap(c => c.Css(".back-button"));
        }

		private void TakeScreenshot(string screenshotTitle)
		{
			var screenshotFileInfo = app.Screenshot(screenshotTitle);
			var device = AppInitializer.AppConfig.phone ? "phone" : "tablet";
			var newScreenshotName = screenshotFileInfo.Name.Replace("screenshot",device);
			var newFilePath = $"{screenshotFileInfo.Directory}/{newScreenshotName}";
			screenshotFileInfo.MoveTo(newFilePath);
		}
    }
}
