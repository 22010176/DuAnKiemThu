using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Edge;
using UITests.Pages;

namespace UITests.Tests
{
  public class BangCapUITests
  {
    private IWebDriver? _driver;
    private BangCapPage? _page;

    [SetUp]
    public void Setup()
    {
      var options = new EdgeOptions();
      // options.AddArgument("headless"); // Bỏ dòng này nếu muốn xem trình duyệt mở ra
      _driver = new EdgeDriver(options);
      _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
      _driver.Navigate().GoToUrl("http://localhost:5173/bang-cap");
      _page = new BangCapPage(_driver);
    }

    [Test]
    public void Test_Add_New_BangCap()
    {
      string name = "Kĩ sư";
      string abbrev = "KS";

      _page?.ClickAddButton();
      _page?.EnterBangCap(name, abbrev);
      _page?.SubmitForm();

      _page?.WaitUntilRowExists("DEG_6"); // Đợi dòng xuất hiện

      Assert.That(_page?.IsMessageDisplayed("Thêm bằng cấp thành công!"), Is.True);
    }
    [Test]
    public void Test_Add_BangCap_With_DuplicateName()
    {
      string existingName = "Giáo sư"; // Giả sử đã có trong CSDL
      string abbrev = $"GS_{DateTime.Now.Ticks}"; // Tạo tên viết tắt duy nhất

      _page!.ClickAddButton();
      _page.EnterBangCap(existingName, abbrev);
      _page.SubmitForm();

      Assert.That(_page.IsMessageDisplayed("Tên bằng cấp đã tồn tại!"), Is.True);
    }
    [Test]
    public void Test_Add_BangCap_With_DuplicateAbbrev()
    {
      string name = "Bằng cấp thử";
      string existingAbbrev = "GS"; // Giả sử đã có

      _page!.ClickAddButton();
      _page.EnterBangCap(name, existingAbbrev);
      _page.SubmitForm();

      Assert.That(_page.IsMessageDisplayed("Tên viết tắt đã tồn tại!"), Is.True);
    }
    [Test]
    public void Test_Add_BangCap_With_MissingFields()
    {
      _page!.ClickAddButton();
      _page.EnterBangCap("", ""); // Cả 2 field rỗng
      _page.SubmitForm();

      Assert.That(_page.IsMessageDisplayed("Nhập thiếu thông tin!"), Is.True);
    }

    [Test]
    public void Test_Edit_BangCap_With_DuplicateAbbrev()
    {
      _page!.ClickEditButton("DEG_5"); // Kỹ sư
      _page.EnterBangCap("Cử nhân", "GS"); // "GS" đã tồn tại
      _page.SubmitForm();

      Assert.That(_page.IsMessageDisplayed("Tên viết tắt đã tồn tại!"), Is.True);
    }


    [Test]
    public void Test_Edit_BangCap()
    {
      string updated = "Thạc sĩ sửa đổi";
      _page?.WaitUntilRowExists("DEG_4"); // Đợi dòng xuất hiện trước khi chỉnh sửa
      _page?.ClickEditButton("DEG_4"); // Chỉnh sửa đúng mã đã hiển thị
      _page?.EnterBangCap(updated, "TSKT");
      _page?.SubmitForm();
      _page?.WaitUntilRowExists("DEG_4"); // Đợi dòng xuất hiện sau khi chỉnh sửa

      Assert.That(_page?.IsMessageDisplayed("Cập nhật bằng cấp thành công!"), Is.True);
    }

    [Test]
    public void Test_Delete_BangCap()
    {
      _page?.WaitUntilRowExists("DEG_4"); // Đợi dòng xuất hiện trước khi xoá
      _page?.ClickDeleteButton("DEG_4"); // Chỉnh sửa đúng mã có sẵn
      _page?.ConfirmDelete();

      Assert.That(_page?.IsMessageDisplayed("Xoá bằng cấp thành công!"), Is.True);
    }

    [TearDown]
    public void TearDown()
    {
      _driver?.Quit();
    }
  }
}
