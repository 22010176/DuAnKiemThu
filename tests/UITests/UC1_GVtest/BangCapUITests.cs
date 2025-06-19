using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using UITests.Drivers;
using UITests.Pages;
using System.Threading;

namespace UITests.Tests
{
  [TestClass]
  public class BangCapUITests
  {
    private IWebDriver? _driver;
    private BangCapPage? _page;

    [TestInitialize]
    public void Setup()
    {
      _driver = WebDriverFactory.CreateEdgeDriver();
      _driver.Manage().Window.Maximize();
      _page = new BangCapPage(_driver);
      _page.GoTo();
    }

    [TestMethod]
    public void Test_Add_New_BangCap()
    {
      string name = "Bằng cấp tự động";
      string abbrev = "TD01";

      _page.AddBangCap(name, abbrev);
      Thread.Sleep(3000); // Đợi API và render

      Assert.IsTrue(_driver.PageSource.Contains(name));
    }

    [TestCleanup]
    public void Cleanup()
    {
      _driver?.Quit();
    }
  }
}
